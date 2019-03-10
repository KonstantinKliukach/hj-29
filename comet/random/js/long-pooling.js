'use strict'

function longPolling (url) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = function () {
    let num = xhr.responseText.replace(/\s/g, '')
    const lhSections = document.querySelectorAll('.long-pooling div')
    for (let lhSection of lhSections) {
      if (lhSection.classList.contains('flip-it')) {
        lhSection.classList.remove('flip-it')
      }
      if (lhSection.textContent === num) {
        lhSection.classList.add('flip-it')
      }
    }
    longPolling('https://neto-api.herokuapp.com/comet/long-pooling')
  }
  xhr.send()
}

longPolling('https://neto-api.herokuapp.com/comet/long-pooling')
