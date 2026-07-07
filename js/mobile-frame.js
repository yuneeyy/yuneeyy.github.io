(() => {
  // 🌟 现在这个作用域是绝对私有的，里面的 myImages 和 currentIndex 绝不会跟主 script.js 抢名字
  const myImages = [
    'images/hero-section/imagetrails_01_3x.webp',
    'images/hero-section/imagetrails_02_3x.webp',
    'images/hero-section/imagetrails_03_3x.webp',
    'images/hero-section/imagetrails_04_3x.webp',
    'images/hero-section/imagetrails_05_3x.webp',
    'images/hero-section/imagetrails_06_3x.webp', 
    'images/hero-section/imagetrails_07_3x.webp',
    'images/hero-section/imagetrails_08_3x.webp', 
    'images/hero-section/imagetrails_09_3x.webp', 
    'images/hero-section/imagetrails_10_3x.webp'
  ];

  function initMobileFrame() {
    if (window.innerWidth >= 1024) return;

    const frame = document.querySelector('.hero-image-frame');
    if (!frame) return;

    frame.innerHTML = '';
    
    myImages.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'frame-img';
      if (index === 0) img.classList.add('is-playing');
      frame.appendChild(img);
    });

    const imgs = frame.querySelectorAll('.frame-img');
    let currentIndex = 0;

    setInterval(() => {
      const oldImg = imgs[currentIndex];
      const nextIndex = (currentIndex + 1) % imgs.length;
      const nextImg = imgs[nextIndex];
      
      // 1. 清空上一轮残留的垫底状态
      imgs.forEach(img => img.classList.remove('was-playing'));
      
      // 2. 旧图片退位，变成垫底背板
      oldImg.classList.remove('is-playing');
      oldImg.classList.add('was-playing');
      
      // 3. 新图片直接激活类名
      nextImg.classList.add('is-playing');
      
      currentIndex = nextIndex;
    }, 1000); 
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileFrame();
  });
})();