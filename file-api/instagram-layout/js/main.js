const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    //this.images = [];
    this.registerEvents();
  }
  registerEvents() {
    this.layout.left = this.container.querySelector('.layout__item_left');
    this.layout.top = this.container.querySelector('.layout__item_top');
    this.layout.bottom = this.container.querySelector('.layout__item_bottom');
    this.layout.left.addEventListener('dragover', event => event.preventDefault());
    this.layout.top.addEventListener('dragover', event => event.preventDefault());
    this.layout.bottom.addEventListener('dragover', event => event.preventDefault());
    this.layout.left.addEventListener('drop', this.loadFile.bind(this))
    this.layout.top.addEventListener('drop', this.loadFile.bind(this))
    this.layout.bottom.addEventListener('drop', this.loadFile.bind(this))
    this.actionButton.addEventListener('click', this.generateCollage.bind(this))
  }
  loadFile(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
		const imageTypeRegExp = /^image\//;
    if (imageTypeRegExp.test(files[0].type)) {
    	const img = document.createElement('img');
      img.src = window.URL.createObjectURL(files[0]);
      /*img.addEventListener('load', event => {
        window.URL.revokeObjectURL(event.target.src);
      });*/

    	event.target.style.backgroundImage = `url('${img.src}')`;
      //this.images.push(img)
    }
    else {
    	console.log('Выбранный файл не является изображением')
    }
  }
  generateCollage(event){
  	const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.positionsContainer.offsetWidth;
    canvas.height = this.positionsContainer.offsetHeight;
    const img = document.createElement('img');

    img.src = this.layout.left.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    ctx.drawImage(img, 0, 0);

    img.src = this.layout.bottom.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    ctx.drawImage(img, Math.floor(canvas.width/2), 0);

    img.src = this.layout.top.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    ctx.drawImage(img, Math.floor(canvas.width/2), Math.floor(canvas.height/2));

    img.src = canvas.toDataURL();
    this.result.textContent = `<img src = "${img.src}"></img>`

  }
}

new iLayout(document.getElementById('layout'));
