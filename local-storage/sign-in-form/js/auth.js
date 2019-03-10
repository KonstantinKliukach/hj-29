'use strict'
const signIn = document.querySelector('[value="Войти"]')
const signUp = document.querySelector('[value="Зарегистрироваться"]')
const sendAuth = new XMLHttpRequest()
const sendReg = new XMLHttpRequest()

function onSendResponse () {
  let response = JSON.parse(sendAuth.responseText)
  let errorField = document.querySelector('.sign-in-htm .error-message')
  if (response.error === true) {
    errorField.textContent = response.message
  } else {
    errorField.textContent = `Пользователь ${response.name} успешно авторизован`
  }
}

function onRegResponse () {
  let response = JSON.parse(sendReg.responseText)
  let errorField = document.querySelector('.sign-up-htm .error-message')
  if (response.error === true) {
    errorField.textContent = response.message
  } else {
    errorField.textContent = `Пользователь ${response.name} успешно авторизован`
  }
}

function authentication () {
  let user = {}
  let regFields = document.querySelectorAll('.sign-in-htm .input')
  for (let field of regFields) {
    user[field.name] = field.value
  }
  event.preventDefault()
  sendAuth.addEventListener('load', onSendResponse)
  sendAuth.open('POST', 'https://neto-api.herokuapp.com/signin')
  sendAuth.setRequestHeader('Content-Type', 'application/json')
  sendAuth.send(JSON.stringify(user))
}

function registration () {
  event.preventDefault()
  let newUser = {}
  let regFields = document.querySelectorAll('.sign-up-htm .input')
  for (let field of regFields) {
    newUser[field.name] = field.value
  }
  sendReg.addEventListener('load', onRegResponse)
  sendReg.open('POST', 'https://neto-api.herokuapp.com/signup')
  sendReg.setRequestHeader('Content-Type', 'application/json')
  sendReg.send(JSON.stringify(newUser))
}

signIn.addEventListener('click', authentication)
signUp.addEventListener('click', registration)
