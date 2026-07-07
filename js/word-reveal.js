(() => {
  // 1. 页面加载的一瞬间，立刻开始拆分文本
  function initWordReveal() {
    const headings = document.querySelectorAll('.word-reveal');
    
    headings.forEach(heading => {
      // 抓取原本的整行纯文本并按空格打碎
      const words = heading.textContent.trim().split(/\s+/);
      heading.innerHTML = ''; // 清空整行

      words.forEach((word, index) => {
        // 创建单词包裹器
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.textContent = word;
        
        // 🌟 注入独一无二的 index 编号，供 CSS 计算延迟时间
        wordSpan.style.setProperty('--word-index', index);
        heading.appendChild(wordSpan);

        // 补回硬空格，防止单词黏在一起
        if (index < words.length - 1) {
          const space = document.createElement('span');
          space.className = 'word-space';
          space.innerHTML = '&nbsp;';
          heading.appendChild(space);
        }
      });
    });
  }

  // 2. 🌟 重点：用最高优先级的 DOMContentLoaded，赶在所有图片加载和视口计算前完成拆分
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWordReveal);
  } else {
    initWordReveal();
  }
})();