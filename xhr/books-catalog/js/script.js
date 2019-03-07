const request = new XMLHttpRequest()
const booksList = document.getElementById('content')
request.addEventListener('load', onLoad)
request.open('GET', 'https://neto-api.herokuapp.com/book/', true)
request.send()

function onLoad () {
  const books = JSON.parse(request.responseText)
  booksList.innerHTML = ''
  for (let book of books) {
    booksList.innerHTML = booksList.innerHTML + `<li
       data-title = '${book.title}'
       data-author='${book.author.name}'
       data-info='${book.info}'
       data-price='${book.price}'>
     <img src='${book.cover.small}'>
  </li>`
  }
}
