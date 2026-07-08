// 修改 JS 中的这一行，让它定位到你刚才创建的 container
const container = document.getElementById('scroll-indicator-container');
const track = document.createElement('div');
track.className = 'scroll-indicator-track';
track.innerHTML = '<div class="scroll-indicator-bar"></div>';
container.appendChild(track); // 这里改成了 append 到 container

const bar = track.querySelector('.scroll-indicator-bar');
let scrollTimeout;

window.addEventListener('scroll', () => {
  // 1. 出现并保持可见
  track.classList.add('is-visible');
  
  // 2. 计算滚动进度 (0% 到 100%)
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // 3. 更新滑块高度（如果是固定高度）或位置
  bar.style.height = `${scrollPercent}%`;

  // 4. 清除并重新计时（防抖逻辑：停止滚动 1.5 秒后消失）
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    track.classList.remove('is-visible');
  }, 1500);
});