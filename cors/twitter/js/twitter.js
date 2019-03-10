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

function setProfile (profile) {
  const userWall = document.querySelector('.bg')
  const username = document.querySelector('[data-username]')
  const userDesc = document.querySelector('[data-description]')
  const userPic = document.querySelector('[data-pic]')
  const userTweets = document.querySelector('[data-tweets]')
  const userFollowers = document.querySelector('[data-followers]')
  const userFollowing = document.querySelector('[data-following]')
  userWall.src = profile.wallpaper
  username.textContent = profile.username
  userDesc.textContent = profile.description
  userPic.src = profile.pic
  userTweets.textContent = profile.tweets
  userFollowers.textContent = profile.followers
  userFollowing.textContent = profile.following
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp').then(setProfile)
