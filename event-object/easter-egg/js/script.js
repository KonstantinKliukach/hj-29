const menu = document.getElementsByTagName('nav')[0]
const secret = document.getElementsByClassName('secret')[0]
const secretCode = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ']
let codeCount = 0

function checkMenu () {
  if ((event.altKey) && (event.code === 'KeyT') && (event.ctrlKey))   {
    if (menu.classList.contains('visible')) {
      menu.classList.remove('visible')
    }
    else {
      menu.classList.add('visible')
    }
  }
}

function checkSecret () {
  if (event.code !== secretCode[codeCount]) {
    codeCount = 0
  }
  if (codeCount === (secretCode.length - 1)) {
    secret.classList.add('visible')
  }
  if (codeCount < secretCode.length) {
    codeCount++
  }
}

document.addEventListener('keydown', checkMenu)
document.addEventListener('keydown', checkSecret)
