'use strict'

const ctx = document.getElementById('canvas')

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw')
ws.addEventListener('open', event => {
  console.log('Соединение установлено!')
})
ws.addEventListener('message', event => {
  console.log(event.data)
})
ws.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`)
})

editor.addEventListener('update', event => canvas.toBlob(img => ws.send(img)))
