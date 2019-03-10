'use strict'
const itemsList = document.querySelector('.items-list')

function ItemToAdd (title, price) {
  this.title = title
  this.price = price
}

function addItem () {
  if (!event.target.classList.contains('add-to-cart')) {
    return
  } else {
    event.preventDefault()
    const newItem = new ItemToAdd(event.target.dataset.title, event.target.dataset.price)
    addToCart (newItem)
  }
}

itemsList.addEventListener('click', addItem)
