const tasks = document.getElementsByTagName('label')
const doneTasks = document.getElementsByClassName('done')[0]
const undoneTasks = document.getElementsByClassName('undone')[0]

function moveTask () {
  if (event.currentTarget.parentElement.classList.contains('done')) {
    undoneTasks.appendChild(event.target)
    undoneTasks.lastElementChild.addEventListener('click', moveTask)
  } else {
    doneTasks.appendChild(event.target)
    doneTasks.lastElementChild.addEventListener('click', moveTask)
  }
}

for (let task of tasks) {
  task.addEventListener('click', moveTask)
}
