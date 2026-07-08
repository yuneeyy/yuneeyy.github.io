document.querySelectorAll('[data-delay]').forEach(el => {
  setTimeout(() => {
    el.classList.add('is-visible');
  }, el.getAttribute('data-delay'));
});