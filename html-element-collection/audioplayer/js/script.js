
let songs = [{
  name: 'LA Chill Tour',
  link: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3'
}, {
  name: 'This is it band',
  link: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3'
}, {
  name: 'LA Fusion Jam',
  link: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'
}]
let songNum = 0
let audio = document.getElementsByTagName('audio')[0]
let iconPlay = document.getElementsByClassName('fa-play')[0]
let iconPause = document.getElementsByClassName('fa-pause')[0]
let player = document.getElementsByClassName('mediaplayer')[0]
let songTitle = document.getElementsByClassName('title')[0]

function letsPlayOrPause () {
  if (getComputedStyle(iconPlay, null).display === 'inline-block') {
    audio.play()
    iconPlay.style.display = 'none'
    iconPause.style.display = 'inline-block'
  } else {
    audio.pause()
    iconPlay.style.display = 'inline-block'
    iconPause.style.display = 'none'
  }
  if (player.classList.contains('red')) {

  }
  player.classList.toggle('play')
}

function letsStop () {
  if (player.classList.contains('play')) {
    player.classList.remove('play')
  }
  let audio = document.getElementsByTagName('audio')[0]
  audio.pause()
  audio.currentTime = 0
  iconPlay.style.display = 'inline-block'
  iconPause.style.display = 'none'
}

function letsNext () {
  songNum += 1
  if (songNum >= songs.length) {
    songNum = 0
  }
  audio.src = songs[songNum].link
  songTitle.title = songs[songNum].name
  audio.play()
  if (!player.classList.contains('play')) {
    player.classList.add('play')
  }
}

function letsBack () {
  songNum -= 1
  if (songNum < 0) {
    songNum = songs.length - 1
  }
  audio.src = songs[songNum].link
  songTitle.title = songs[songNum].name
  audio.play()
  if (!player.classList.contains('play')) {
    player.classList.add('play')
  }
}

const playOrPause = document.getElementsByClassName('playstate')[0]
const stop = document.getElementsByClassName('stop')[0]
const next = document.getElementsByClassName('next')[0]
const back = document.getElementsByClassName('back')[0]

playOrPause.onclick = letsPlayOrPause
stop.onclick = letsStop
next.onclick = letsNext
back.onclick = letsBack
