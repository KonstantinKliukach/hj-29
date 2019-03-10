'use strict'

const canvas = document.getElementById('draw')
const ctx = canvas.getContext('2d')

let drawing = false
let brushSize = 100
let hue = 0
let lastX, lastY

function draw (x, y, isDown) {
  if (isDown) {
    ctx.beginPath()
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.lineWidth = brushSize
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.stroke()
  }
  lastX = x
  lastY = y
}

canvas.addEventListener('mousedown', (evt) => {
  drawing = true
  draw(evt.pageX, evt.pageY, false)
})

canvas.addEventListener('mouseup', (evt) => {
  drawing = false
})

canvas.addEventListener('mouseleave', (evt) => {
  drawing = false
})

canvas.addEventListener('mousemove', (evt) => {
  if (drawing) {
    changeBrushSize()
    changeHue()
    draw(evt.pageX, evt.pageY, true)
  }
})

function changeBrushSize () {
  if (brushSize < 100) {
    brushSize++
  } else {
    brushSize = 1
  }
}

function changeHue () {
  if (hue < 359) {
    hue++
  } else {
    hue = 1
  }
}

function resizeCanvas () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas)
