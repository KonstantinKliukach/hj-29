'use strict'

function createElements () {
  const app = document.querySelector('.app')
  const videoTag = document.createElement('video')
  const audioTag = document.createElement('audio')
  const takePhoto = document.querySelector('.controls')
  takePhoto.style.display = 'flex'
  app.appendChild(videoTag)
  app.appendChild(audioTag)
}

createElements()
const video = document.querySelector('video')
const audio = document.querySelector('audio')
audio.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3'

function loadCamera () {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      video.srcObject = stream
      video.play()
    })
    .catch((err) => {
      const error = document.querySelector('#error-message')
      error.textContent = err
    })
}

function takePicture () {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  ctx.drawImage(video, 0, 0)
  const src = canvas.toDataURL()
  addToList(src)
}

function addToList (src) {
  const listContainer = document.querySelector('.list')
  const newPhoto = createElement(listTemplate(src))
  let buttons = newPhoto.querySelectorAll('a')
  buttons.forEach((button) => {
    if (button.textContent === 'delete') {
      button.addEventListener('click', deletePhoto)
    }
    if (button.textContent === 'file_upload') {
      button.addEventListener('click', loadPhoto)
    }
  })
  listContainer.appendChild(newPhoto)
}

function listTemplate (srcUrl) {
  return {
    name: 'figure',
    childs: [{
        name: 'img',
        props: {
          src: `${srcUrl}`
        }
      },
      {
        name: 'figcaption',
        childs: [{
            name: 'a',
            props: {
              href: `${srcUrl}`,
              download: 'snapshot.png'
            },
            childs: [{
              name: 'i',
              props: {
                class: 'material-icons'
              },
              childs: ['file_download']
            }]

          },
          {
            name: 'a',
            childs: [{
              name: 'i',
              props: {
                class: 'material-icons'
              },
              childs: ['file_upload']
            }]

          },
          {
            name: 'a',
            childs: [{
              name: 'i',
              props: {
                class: 'material-icons'
              },
              childs: ['delete']
            }]
          }
        ]
      }
    ]
  }
}

function createElement (node) {
  const element = document.createElement(node.name)
  if (node.props) {
    Object.keys(node.props).forEach(key => {
      element.setAttribute(key, node.props[key])
    })
  }
  if (node.childs) {
    node.childs.forEach((child) => {
      if (typeof child === 'string') {
        element.textContent = child
      } else {
        element.appendChild(createElement(child))
      }
    })
  }
  return element
}

function deletePhoto () {
  const thisPhoto = event.currentTarget.parentElement
  thisPhoto.parentElement.remove()
}

function loadPhoto () {
  const thisPhoto = event.currentTarget.parentElement
  const image = thisPhoto.parentElement.querySelector('img').src
  console.log(image)
  fetch('https://neto-api.herokuapp.com/photo-booth', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: {
      image
    }
  }).then(function (response) {
    console.log(response)
  })
    .catch((err) => {
      console.log(err)
    })
}

document.addEventListener('DOMContentLoaded', loadCamera)
document.getElementById('take-photo').addEventListener('click', takePicture)
