function draw (canvas, count, radius, x, y) {
  let context = canvas.getContext('2d')
  context.fillStyle = '#f4f5f5'
  context.fillRect(0,0,canvas.width, canvas.height)
  
  for (let i = 0; i < count; i++) {

    var angle = 360 / count * i;//烟花粒子角度
    var radians = angle * Math.PI / 180;//烟花粒子弧度

    var vx = x + Math.cos(radians) * radius;
    var vy = y + Math.sin(radians) * radius;

    var size = 2;
    context.beginPath();
    context.arc(vx, vy, size, 0, Math.PI * 2, false)
    context.closePath();
    context.fillStyle = "#ff0000";
    context.fill();
  }
  
}

function createCanvas () {
  let canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.position = 'fixed'
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.zIndex = -1
  document.body.appendChild(canvas)

  return canvas
}


export default function createStar (x, y) {
  let canvas = createCanvas(x, y)

  let radius = 0, count = 10;
  draw(canvas, count, radius, x, y)
  setInterval(() => {
    radius++
    draw(canvas, count, radius, x, y)
  }, 30)

  // let timer = setTimeout(() => {
  //   document.body.removeChild(canvas);
  //   clearTimeout(timer);
  // }, 1 * 1000)
}