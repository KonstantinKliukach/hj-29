'use strict'
const counter = document.querySelector('#counter')

function getCounterFromLS () {
  if (localStorage.getItem('countNumber') === null) {
    counter.textContent = '0'
  } else {
    counter.textContent = localStorage.getItem('countNumber')
  }
}

function changeCounter () {
  if (event.target.id !=='increment' && event.target.id !== 'decrement' && event.target.id !== 'reset') {
    return
  }
  switch (event.target.id) {
    case 'increment':
      counter.textContent = parseInt(counter.textContent) + 1
      break
    case 'decrement':
      if (parseInt(counter.textContent) === 0) {
        return
      }
      else {
        counter.textContent = parseInt(counter.textContent) -1
      }
      break
    case 'reset':
      counter.textContent = '0'
      localStorage.clear()
      break
  }
  localStorage.setItem('countNumber', counter.textContent.toString())
}

document.addEventListener('DOMContentLoaded', getCounterFromLS)
document.addEventListener('click', changeCounter)
