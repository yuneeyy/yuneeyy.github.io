/* ==========================================================================
   🖥️ 电脑端鼠标跟随系统 (Image Trails - 精准区域版)
   ========================================================================== */
(() => {
  // 1. 核心安全锁：如果是移动端，直接原地退场，绝对不破坏 mobile-frame.js
  if (window.innerWidth < 1200) return;

  // 2. 正确的图片路径
  const trailImages = [
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

  let currentIndex = 0;
  let lastX = 0;
  let lastY = 0;
  const threshold = 130; // 鼠标每移动 130px 吐出一张图片

  // 3. 监听鼠标移动（精准限定在 #hero 区域）
  const heroSection = document.getElementById('hero');
  
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;

      // 🌟 修正：为了完美兼容页面滚动，使用 pageX/pageY，配合 fixed 容器绝不位移
      const currentX = e.pageX;
      const currentY = e.pageY;

      const distance = Math.hypot(currentX - lastX, currentY - lastY);

      if (distance > threshold) {
        createTrailImage(trailImages[currentIndex], currentX, currentY);
        
        lastX = currentX;
        lastY = currentY;
        currentIndex = (currentIndex + 1) % trailImages.length;
      }
    });
  } // 🌟 修复点 1：在这里把 heroSection 的 if 判断正确闭合！

  // 4. 动态创建图片并精准塞进你的 #image-trail-container
  function createTrailImage(src, x, y) {
    const container = document.getElementById('image-trail-container');
    if (!container) return; // 防错保护

    const img = document.createElement('img');
    img.src = src;
    img.className = 'trail-image'; // 完美对齐你的 CSS 类名 .trail-image
    
    // 🌟 修正：配合上面的 pageX/pageY，如果你的容器是 fixed，这里用 absolute 或直接减去 scroll 即可。
    // 如果你的 #image-trail-container 依然是 position: fixed 且没有随页面滚动：
    // 我们用绝对坐标减去页面的滚动距离，确保滚动后鼠标指针和图片中心依然死死对齐！
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    img.style.left = `${x - scrollX}px`;
    img.style.top = `${y - scrollY}px`;

    container.appendChild(img);

    setTimeout(() => {
      img.classList.add('is-active'); // 此时触发进场 transition 动画
    }, 50);

    // 1秒后启动优雅淡出
    setTimeout(() => {
      img.classList.remove('is-active');
      img.classList.add('is-fading'); 
      
      // 动画完全播完后拔除节点
      setTimeout(() => {
        img.remove();
      }, 500);
    }, 1000);
  }
})(); // 🌟 修复点 2：整体 IIFE 沙盒完美闭合