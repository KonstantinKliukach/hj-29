const links = ['https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg', 'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg', 'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg', 'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg', 'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg']
let currentPhotoNum = 0
let firstPhoto = document.getElementById('currentPhoto')
firstPhoto.src = links[0]
const nextButton = document.getElementById('nextPhoto')
const prevButton = document.getElementById('prevPhoto')

function nextPhoto () {
  currentPhotoNum += 1
  if (currentPhotoNum >= links.length) {
    currentPhotoNum = 0
  }
  firstPhoto.src = links[currentPhotoNum]
}

function prevPhoto () {
  currentPhotoNum -= 1
  if (currentPhotoNum <= 0) {
    currentPhotoNum = links.length - 1
  }
  firstPhoto.src = links[currentPhotoNum]
}
nextButton.onclick = nextPhoto
prevButton.onclick = prevPhoto
