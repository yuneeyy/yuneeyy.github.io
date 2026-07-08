document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');

  // 监听滚动逻辑
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
});