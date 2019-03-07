const request = new XMLHttpRequest()
const spiner = document.getElementsByClassName('spin')[0]
const weather = document.getElementsByClassName('weather-body')[0]

request.addEventListener('error', onError)
request.addEventListener('load', onLoad)
request.open('GET', 'https://neto-api.herokuapp.com/weather', true)
request.send()

function onLoad () {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText)
    setData(response)
  }
}

function onError () {
  spiner.classList.add('hidden')
  weather.classList.remove('hidden')
}
