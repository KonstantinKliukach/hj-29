'use strict'
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket')
ws.addEventListener('open', event => {
  console.log('Соединение установлено!')
})
ws.addEventListener('message', event => {
  const wsSections = document.querySelectorAll('.websocket div')
  for (let wsSection of wsSections) {
    if (wsSection.classList.contains('flip-it')) {
      wsSection.classList.remove('flip-it')
    }
    if (wsSection.textContent === event.data) {
      wsSection.classList.add('flip-it')
    }
  }
})
ws.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`)
})
