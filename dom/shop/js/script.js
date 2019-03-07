function getPriceFormatted (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const addButtons = document.getElementsByClassName('add')
const cartCount = document.getElementById('cart-count')
const cartTotalPrice = document.getElementById('cart-total-price')
let cartSum = 0
let totalValue = 0

function addCart () {
  cartSum = cartSum + 1
  cartCount.innerHTML = cartSum
  totalValue = totalValue + Number.parseInt(event.currentTarget.dataset.price)
  cartTotalPrice.innerHTML = getPriceFormatted(totalValue)
}

for (let button of addButtons) {
  button.addEventListener('click', addCart)
}
