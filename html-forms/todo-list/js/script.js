const checkboxes = document.getElementsByTagName('input')
const listBlock = document.getElementsByClassName('list-block')[0]
const result = document.getElementsByTagName('output')[0]

let taskCounter = 0

function counter () {
  if (event.currentTarget.checked === false && taskCounter > 0) {
    taskCounter = --taskCounter
  }
  if (event.currentTarget.checked === true) {
    taskCounter = ++taskCounter
  }
  if (taskCounter === checkboxes.length) {
    listBlock.classList.add('complete')
  } else {
    listBlock.classList.remove('complete')
  }
  result.value = taskCounter
}

for (let checkbox of checkboxes) {
  if (checkbox.checked === true) {
    taskCounter = ++taskCounter
  }
  result.value = taskCounter
  checkbox.addEventListener('input', counter)
}
