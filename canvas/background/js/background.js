const canvas = document.getElementById('wall')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.scale(2, 2)

const fps = 20
let allObjects = []

function getRandomNum (min, max) {
  return Math.random() * (max - min) + min
}

function Cross () {
  this.size = Number.parseFloat(getRandomNum(0, 0.6).toFixed(1))
  this.startX = Math.floor(getRandomNum(0, canvas.width))
  this.startY = Math.floor(getRandomNum(0, canvas.height))
  this.angle = Math.floor(getRandomNum(0, 360))
  if (Math.random() * 2) {
    this.nextPoint = function nextPoint (x, y, time) {
      return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
      }
    }
  } else {
    this.nextPoint = function nextPoint (x, y, time) {
      return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
      }
    }
  }
}

function drawNewCross (cross) {
  let newPlace
  ctx.beginPath()
  ctx.lineWidth = 5 * cross.size
  ctx.strokeStyle = 'white'
  newPlace = cross.nextPoint(cross.startX, cross.startY, Date.now())
  ctx.moveTo(newPlace.x, newPlace.y)
  ctx.lineTo((newPlace.x + 10 * cross.size), newPlace.y)
  ctx.stroke()
  ctx.moveTo(newPlace.x, newPlace.y)
  ctx.lineTo((newPlace.x - 10 * cross.size), newPlace.y)
  ctx.stroke()
  ctx.moveTo(newPlace.x, newPlace.y)
  ctx.lineTo(newPlace.x, (newPlace.y + 10 * cross.size))
  ctx.stroke()
  ctx.moveTo(newPlace.x, newPlace.y)
  ctx.lineTo(newPlace.x, (newPlace.y - 10 * cross.size))
  ctx.stroke()
  ctx.closePath()
}

function Circle () {
  this.size = Number.parseFloat(getRandomNum(0, 0.6).toFixed(1))
  this.startX = Math.floor(getRandomNum(0, canvas.width))
  this.startY = Math.floor(getRandomNum(0, canvas.height))
  if (Math.random() * 2) {
    this.nextPoint = function nextPoint (x, y, time) {
      return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
      }
    }
  } else {
    this.nextPoint = function nextPoint (x, y, time) {
      return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
      }
    }
  }
}

function drawNewCircle (circle) {
  const PI = Math.PI
  let newPlace
  ctx.beginPath()
  ctx.lineWidth = 5 * circle.size
  ctx.strokeStyle = 'white'
  newPlace = circle.nextPoint(circle.startX, circle.startY, Date.now())
  ctx.arc(newPlace.x, newPlace.y, 12 * circle.size, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

function addObjects () {
  const objects = Math.floor(getRandomNum(50, 200))
  for (let i = 0; i < Math.floor(objects / 2); i++) {
    const circle = new Circle()
    const cross = new Cross()
    allObjects.push(circle)
    allObjects.push(cross)
  }
}

function drawObjects () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < allObjects.length; i++) {
    if (allObjects[i] instanceof Circle) {
      drawNewCircle(allObjects[i])
    } else {
      drawNewCross(allObjects[i])
    }
  }
}

function tick () {
  setTimeout(function () {
    requestAnimationFrame(tick)
    drawObjects()
  }, 1000 / fps)
}

addObjects()

tick()
