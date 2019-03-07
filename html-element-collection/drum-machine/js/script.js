'use strict'
function makeClap () {
  let audio = clap.getElementsByTagName('audio')[0]
  audio.play()
}

function makeHihat () {
  let audio = hihat.getElementsByTagName('audio')[0]
  audio.play()
}

function makeKick () {
  let audio = kick.getElementsByTagName('audio')[0]
  audio.play()
}

function makeOpenhat () {
  let audio = openhat.getElementsByTagName('audio')[0]
  audio.play()
}

function makeBoom () {
  let audio = boom.getElementsByTagName('audio')[0]
  audio.play()
}

function makeRide () {
  let audio = ride.getElementsByTagName('audio')[0]
  audio.play()
}

const clap = document.getElementsByClassName('key-clap')[0]
const hihat = document.getElementsByClassName('key-hihat')[0]
const kick = document.getElementsByClassName('key-kick')[0]
const openhat = document.getElementsByClassName('key-openhat')[0]
const boom = document.getElementsByClassName('key-boom')[0]
const ride = document.getElementsByClassName('key-ride')[0]

clap.onclick = makeClap
hihat.onclick = makeHihat
kick.onclick = makeKick
openhat.onclick = makeOpenhat
boom.onclick = makeBoom
ride.onclick = makeRide
