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
  const userData = loadData('https://neto-api.herokuapp.com/profile/me')
  const user = await userData
  setProfile(user)
  const userTech = loadData(`https://neto-api.herokuapp.com/profile/${user.id}/technologies`)
  const tech = await userTech
  setTech(tech)
  const content = document.querySelector('.content')
  content.style.display = 'initial'
}

function setProfile (profile) {
  const username = document.querySelector('[data-name]')
  const userDesc = document.querySelector('[data-description]')
  const userPic = document.querySelector('[data-pic]')
  const userPos = document.querySelector('[data-position]')
  username.textContent = profile.name
  userDesc.textContent = profile.description
  userPos.textContent = profile.position
  userPic.src = profile.pic
}

function setTech (tech) {
  const userTech = document.querySelector('[data-technologies]')
  for (let i = 0; i < tech.length; i++) {
    let span = document.createElement('span')
    userTech.appendChild(span)
    userTech.lastElementChild.classList.add('devicons')
    userTech.lastElementChild.classList.add(`devicons-${tech[i]}`)
  }
}
getAllData()
