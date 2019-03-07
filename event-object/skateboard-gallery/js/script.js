let skates = document.getElementsByTagName('a')
let fullsize = document.getElementsByClassName('gallery-view')[0]

function setActive (event, num) {
  event.preventDefault()
  for (let skate of skates) {
    skate.classList.remove('gallery-current')
  }
  event.currentTarget.classList.add('gallery-current')
  fullsize.src = event.currentTarget.href
}

for (let skate of skates) {
  skate.addEventListener('click', setActive)
}
