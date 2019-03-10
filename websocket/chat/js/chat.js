'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat')
const chat = document.querySelector('.chat')
const messageBox = chat.querySelector('.message-box')
const messages = chat.querySelector('.messages-content')
const chatStatus = chat.querySelector('.chat-status')

messageBox.addEventListener('submit', sendMessage)

connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online
  const messageStatus = chat.querySelector('.message-status')
  const submit = chat.querySelector('.message-submit')
  displayMessage(messageStatus, 'Пользователь в сети')
  submit.disabled = false
})

connection.addEventListener('message', (event) => {
  if (event.data === '...') {
    const messageStatus = chat.querySelector('.message-status')
    displayMessage(messageStatus, 'Пользователь печатает сообщение')
  } else {
    let typingMessages = messages.querySelectorAll('.message-status')
    const messageIncoming = chat.querySelectorAll('.message')
    for (let message of typingMessages) {
      if (message.firstElementChild.textContent === 'Пользователь печатает сообщение') {
        message.remove()
      }
    }
    displayMessage(messageIncoming[1], event.data)
  }
})

function sendMessage () {
  event.preventDefault()
  const messagePersonal = chat.querySelector('.message-personal')
  displayMessage(messagePersonal, event.target.firstElementChild.value)
  connection.send(event.target.firstElementChild.value)
}

function displayMessage (template, content) {
  const newMessage = template.cloneNode('true')
  const timestamp = newMessage.querySelector('.timestamp')
  const text = newMessage.querySelector('.message-text')
  text.textContent = content
  if (timestamp !== null) {
    timestamp.textContent = getTime()
  }
  messages.appendChild(newMessage)
}

function getTime () {
  let time = new Date()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  return `${hours}:${minutes}`
}
