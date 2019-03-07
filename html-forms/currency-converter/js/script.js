const request = new XMLHttpRequest()
let currencies
const loader = document.getElementById('loader')
const content = document.getElementById('content')
const currFrom = document.getElementById('from')
const currTo = document.getElementById('to')
const amount = document.getElementById('source')
const result = document.getElementById('result')

request.addEventListener('load', onLoad)
request.addEventListener('loadstart', onLoading)
request.open('GET', 'https://neto-api.herokuapp.com/currency', true)
request.send()

function onLoading () {
  loader.classList.remove('hidden')
}

function convertCurrency () {
  let from = currencies.find(fromFind => fromFind.code === currFrom.value)
  let to = currencies.find(toFind => toFind.code === currTo.value)
  let rate = Number.parseInt(amount.value) * from.value
  rate = rate / to.value
  rate = Math.floor(rate * 100) / 100
  if (isNaN(rate)) {
    result.value = 'Введите число'
  } else {
    result.value = rate
  }
}

function onLoad () {
  currencies = JSON.parse(request.responseText)
  loader.classList.add('hidden')
  content.classList.remove('hidden')
  for (let currency of currencies) {
    from.innerHTML = from.innerHTML + `<option value='${currency.code}'>${currency.code}</option>`
    to.innerHTML = to.innerHTML + `<option value='${currency.code}'>${currency.code}</option>`
  }
  convertCurrency()
  amount.addEventListener('input', convertCurrency)
  from.addEventListener('input', convertCurrency)
  to.addEventListener('input', convertCurrency)
}
