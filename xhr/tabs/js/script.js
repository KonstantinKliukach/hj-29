'use strict'
const switchers = document.getElementsByTagName('a')
const content = document.getElementById('content')
const loading = document.getElementById('preloader')
const request = new XMLHttpRequest()

request.addEventListener('load', onLoad)
request.addEventListener('loadstart', onLoading)

function activate () {
  event.preventDefault()
  for (let switcher of switchers) {
    switcher.classList.remove('active')
    event.currentTarget.classList.add('active')
  }
  request.open('GET', event.currentTarget.href, true)
  request.send()
}

function onLoad () {
  loading.classList.add('hidden')
  content.innerHTML = request.responseText
}

function onLoading () {
  content.innerHTML = ''
  loading.classList.remove('hidden')
}

for (let switcher of switchers) {
  switcher.addEventListener('click', activate)
}
