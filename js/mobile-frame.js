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
    'images/hero-section/imagetrails_10_3x.webp',
    'images/hero-section/imagetrails_11_3x.webp',
    'images/hero-section/imagetrails_12_3x.webp',
    'images/hero-section/imagetrails_13_3x.webp',
    'images/hero-section/imagetrails_14_3x.webp',
  ];

  // 🌟 [新增工具函数]：生成 -3 到 +3 之间的随机角度，小数更细腻
  function getRandomRotate() {
    return (Math.random() * 10 - 5).toFixed(1); 
  }

  function initMobileFrame() {
    if (window.innerWidth >= 1200 && !matchMedia('(pointer:coarse)').matches) {
      return;
    }

    const frame = document.querySelector('.hero-image-frame');
    if (!frame) return;

    frame.innerHTML = '';
    
    myImages.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'frame-img';
      
      // 🌟 第一张图初始化时也给一个随机角度
      if (index === 0) {
        img.classList.add('is-playing');
        img.style.setProperty('--rand-deg', `${getRandomRotate()}deg`);
      }
      
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
      
      // 2. 旧图片退位，保持不动
      oldImg.classList.remove('is-playing');
      oldImg.classList.add('was-playing');
      
      // 3. 🌟 新图片登场前，算一个全新的随机角度，通过 CSS 变量传过去
      nextImg.style.setProperty('--rand-deg', `${getRandomRotate()}deg`);
      nextImg.classList.add('is-playing');
      
      currentIndex = nextIndex;
    }, 1000); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFrame);
  } else {
    initMobileFrame();
  }
})();