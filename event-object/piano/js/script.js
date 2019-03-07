let notesMiddle = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3']
let notesLower = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3']
let notesHigher = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3']

let keys = document.getElementsByTagName('LI')
let registr = document.getElementsByClassName('set')[0]

function changeMod () {
  event.preventDefault()
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    registr.classList.remove('middle')
    registr.classList.add('lower')
  } else if (event.code === 'AltLeft' || event.code === 'AltRight') {
    registr.classList.remove('middle')
    registr.classList.add('higher')
  }
}

function returnDefault () {
  event.preventDefault()
  registr.classList.remove('lower')
  registr.classList.remove('higher')
}

function stopAll () {
  let allPlayers = document.getElementsByTagName('audio')
  for (const player of allPlayers) {
    player.pause()
    player.currentTime = 0
  }
}

function playNote (event, num) {
  stopAll()
  let audio = event.currentTarget.getElementsByTagName('audio')[0]
  if (event.shiftKey) {
    audio.src = notesLower[num]
  } else if (event.altKey) {
    audio.src = notesHigher[num]
  } else {
    audio.src = notesMiddle[num]
  }
  audio.play()
}

for (let keyNum = 0; keyNum < keys.length; keyNum++) {
  keys[keyNum].addEventListener('click', function () {
    playNote(event, keyNum)
  })
}

document.addEventListener('keydown', changeMod)
document.addEventListener('keyup', returnDefault)
