window.addEventListener('scroll', () => {
  const arrow = document.querySelector('.scroll-down-arrow');
  if (!arrow) return;
  
  if (window.scrollY > 100) {
    arrow.style.opacity = '0';
    arrow.style.pointerEvents = 'none'; // 隐藏后禁用点击
  } else {
    arrow.style.opacity = '0.6';
    arrow.style.pointerEvents = 'auto';
  }
});