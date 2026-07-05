/* ==========================================================================
   Scroll-reveal
   Adds .is-visible to any [data-reveal] element once it enters the viewport.
   ========================================================================== */
(function revealOnScroll(){
  const items = document.querySelectorAll('[data-reveal]');
  if(!items.length) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ==========================================================================
   Placeholder fallback
   Every <figure class="frame"> holds an <img>. If the image referenced in
   src can't be loaded (because it hasn't been added yet), the frame falls
   back to a grey "artboard" placeholder that names the expected file —
   see data-label on each <figure> and the matching filename in /images.
   ========================================================================== */
(function placeholderFallback(){
  document.querySelectorAll('.frame img').forEach(img => {
    img.addEventListener('error', () => {
      img.closest('.frame')?.classList.add('frame--empty');
    }, { once: true });

    // Catch images that are already broken by the time this script runs.
    if(img.complete && img.naturalWidth === 0){
      img.closest('.frame')?.classList.add('frame--empty');
    }
  });
})();