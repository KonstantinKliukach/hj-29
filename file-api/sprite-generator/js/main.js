const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0)
class SpriteGenerator {
  constructor (container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload')
    this.submitButton = container.querySelector('.sprite-generator__generate')
    this.imagesCountContainer = container.querySelector('.images__added-count-value')
    this.codeContainer = container.querySelector('.sprite-generator__code')
    this.imageElement = container.querySelector('.sprite-generator__result-image')
    this.images = []
    this.files = []
    this.imagesCount = 0
    this.registerEvents()
  }
  registerEvents () {
    this.uploadButton.addEventListener('change', this.selectFiles.bind(this))
    this.submitButton.addEventListener('click', this.generateSprite.bind(this))
  }
  selectFiles (event) {
    this.files = Array.from(event.target.files)
    this.files.forEach(file => {
      const img = document.createElement('img')
      img.width = 100
      img.height = 100
      img.src = window.URL.createObjectURL(file)
      img.addEventListener('load', event => {
        window.URL.revokeObjectURL(event.target.src)
      })
      this.images.push(img)
      this.imagesCount = this.images.length
    })
  }
  generateSprite (event) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 100 * this.images.length
    canvas.height = 100
    let startX = 0
    this.images.forEach(img => {
      ctx.drawImage(img, startX, 0)
      startX += 100
    })
    this.imageElement.src = canvas.toDataURL()
    this.imagesCountContainer.textContent = this.images.length
    this.generateCSS()
  }
  generateCSS () {
    this.codeContainer.textContent = '.icon {display: inline-block \n background-image: url(img/sprite.png)} \n'
    this.files.forEach(file => {
      this.codeContainer.textContent += `.icon_${file.name} {background-position: -48px 0 \n width: 50px \n height: 50px}`
    })
  }
}

new SpriteGenerator(document.getElementById('generator'))
