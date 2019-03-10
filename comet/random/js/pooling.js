'use strict'
setInterval(sendOnRepeat, 5000)

function sendOnRepeat () {
  const pooling = new XMLHttpRequest()
  pooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true)
  pooling.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const shSections = document.querySelectorAll('.pooling div')
      for (let shSection of shSections) {
        if (shSection.classList.contains('flip-it')) {
          shSection.classList.remove('flip-it')
        }
        if (shSection.textContent === this.responseText) {
          shSection.classList.add('flip-it')
        }
      }
    }
  }
  pooling.send()
}
