export default function createStar (x, y) {
  const div = document.createElement('div');
  div.className = 'heart';
  div.style.top = y - 10 + 'px';
  div.style.left = x - 5 + 'px';

  document.body.appendChild(div);

  let timer = setTimeout(() => {
    document.body.removeChild(div);
    clearTimeout(timer);
  }, 0.7 * 1000)
}