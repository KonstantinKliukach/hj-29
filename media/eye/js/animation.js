'use strict'
document.addEventListener('mousemove', moveEye)
document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', '5px')

function moveEye () {
  const eye = document.querySelector('.big-book__pupil')
  const x = event.screenX * 100 / window.innerWidth
  const y = event.screenY * 100 / window.innerHeight
  const newX = Math.floor(findNumber(x, -30, 30)) + 'px'
  const newY = Math.floor(findNumber(y, -30, 30)) + 'px'
  eye.style.setProperty('--pupil-x', newX)
  eye.style.setProperty('--pupil-y', newY)
}

function findNumber (percent, min, max) {
  const result = (percent * (max - min) / 100) + min
  return result
}
