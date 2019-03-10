'use strict'

function loadData (url) {
  const functionName = randName()
  return new Promise((resolve, reject) => {
    window[functionName] = resolve
    let script = document.createElement('script')
    document.body.appendChild(script)
    document.body.lastElementChild.src = `${url}?jsonp=${functionName}`
  })
}

function randName () {
  let name = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    name += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return name
}

async function getAllData () {
  const recipeData = loadData('https://neto-api.herokuapp.com/food/42')
  const recipe = await recipeData
  setRecipe(recipe)

  const recipeRate = loadData(`https://neto-api.herokuapp.com/food/42/rating`)
  const rate = await recipeRate
  setRate(rate)

  const recipeUsers = loadData(`https://neto-api.herokuapp.com/food/42/consumers`)
  const users = await recipeUsers
  setUsers(users)
}

function setRecipe (recipe) {
  const recPic = document.querySelector('[data-pic]')
  const recTitle = document.querySelector('[data-title]')
  const recIngridients = document.querySelector('[data-ingredients]')
  recPic.style.backgroundImage = 'url(' + recipe.pic + ')'
  recTitle.textContent = recipe.title
  for (let ingr of recipe.ingredients) {
    recIngridients.textContent += ingr + ', '
  }
}

function setRate (rate) {
  let rateFixed = rate.rating.toFixed(2)
  const recRate = document.querySelector('[data-rating]')
  const recStars = document.querySelector('[data-star]')
  recRate.textContent = rateFixed
  rateFixed = (rateFixed * 10) + 'px'
  recStars.style.width = rateFixed
}

function setUsers (users) {
  const consumers = document.querySelector('[data-consumers]')
  for (let user of users.consumers) {
    let newConsumer = document.createElement('img')
    consumers.appendChild(newConsumer)
    consumers.lastElementChild.src = user.pic
    consumers.lastElementChild.title = user.name
  }
  let newTotal = document.createElement('span')
  consumers.appendChild(newTotal)
  const s1 = '\u{002B}'
  consumers.lastElementChild.textContent = `(\u{002B}${users.total})`
}
getAllData()
