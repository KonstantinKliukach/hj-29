const links = ['https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png']
const img = document.getElementById('slider')
let step = 1
img.src = 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png'

function changeImg () {
  img.src = links[step]
  step = step + 1
  if (step >= links.length) {
    step = 0
  }
}
setInterval(changeImg, 5000)
