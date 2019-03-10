'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse')

document.addEventListener('click', event => {
  let position = {}
  position.x = event.clientX
  position.y = event.clientY
  connection.send(JSON.stringify(position))
})
connection.addEventListener('open', event => {
  showBubbles(connection)
  console.log('соединение установлено!')
})

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`)
})
