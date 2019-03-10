'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter')

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Работа закончена')
})

connection.addEventListener('open', event => {
  console.log('соединение установлено!')
})

connection.addEventListener('error', error => {
  console.log(error.data)
})

connection.addEventListener('message', event => {
  let info = JSON.parse(event.data)
  const counter = document.querySelector('.counter')
  counter.textContent = info.connections
  const errors = document.querySelector('.errors')
  errors.textContent = info.errors
  console.log(info)
})
