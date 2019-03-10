'use strict'
const fillAll = document.querySelector('#btnSetFull')
const clearAll = document.querySelector('#btnSetEmpty')
const showSeatMap = document.querySelector('#btnSeatMap')
const total = document.querySelector('#totalPax')
const adult = document.querySelector('#totalAdult')
const half = document.querySelector('#totalHalf')

fillAll.disabled = true
clearAll.disabled = true

function loadMap () {
  event.preventDefault()
  const flight = document.querySelector('.form-control').value
  fetch(`https://neto-api.herokuapp.com/plane/${flight}`)
    .then(res => res.json())
    .then(showMap)
    .then(activateControl)
}

function showMap (list) {
  const title = document.querySelector('#seatMapTitle')
  title.textContent = `${list.title} (${list.passengers} пассажиров)`
  // let totalSeats = list.passengers
  const rowContainer = document.querySelector('#seatMapDiv')
  rowContainer.textContent = ''
  for (let i = 0; i < list.scheme.length; i++) {
    rowContainer.appendChild(rowJSEngine(rowTemplate(list.scheme[i], i, list.letters4, list.letters6)))
  }
}

function activateControl () {
  const seats = document.querySelectorAll('.seat')
  seats.forEach((seat) => {
    seat.addEventListener('click', bookSeat)
  })
  total.textContent = 0
  adult.textContent = 0
  half.textContent = 0
  fillAll.disabled = false
  fillAll.addEventListener('click', setUpFull)
  clearAll.disabled = false
  clearAll.addEventListener('click', setUpClearAll)
}

function setUpFull () {
  event.preventDefault()
  const seats = document.querySelectorAll('.seat')
  // const totalSeats = 0
  seats.forEach((seat) => {
    if (seat.classList.contains('half') || seat.classList.contains('adult')) {
      return
    }
    adult.textContent = parseInt(adult.textContent) + 1
    seat.classList.remove('half')
    seat.classList.add('adult')
  })
  countTotal()
}

function setUpClearAll () {
  event.preventDefault()
  const seats = document.querySelectorAll('.seat')
  seats.forEach((seat) => {
    seat.classList.remove('adult')
    seat.classList.remove('half')
  })
  total.textContent = 0
  adult.textContent = 0
  half.textContent = 0
}

function bookSeat () {
  if (event.currentTarget.classList.contains('adult')) {
    event.currentTarget.classList.remove('adult')
    adult.textContent = parseInt(adult.textContent) - 1
    countTotal()
    return
  }
  if (event.currentTarget.classList.contains('half')) {
    event.currentTarget.classList.remove('half')
    half.textContent = parseInt(half.textContent) - 1
    countTotal()
    return
  }
  if (event.altKey) {
    event.currentTarget.classList.add('half')
    half.textContent = parseInt(half.textContent) + 1
    countTotal()
  } else {
    event.currentTarget.classList.add('adult')
    adult.textContent = parseInt(adult.textContent) + 1
    countTotal()
  }
}

function countTotal () {
  total.textContent = parseInt(adult.textContent) + parseInt(half.textContent)
}

function rowJSEngine (block) {
  const element = document.createElement(block.tag)
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('')
  }
  if ((typeof block === 'number') || (typeof block === 'string') || (block === true)) {
    return document.createTextNode(block.toString())
  }
  if (block.class) {
    element.classList.add(...[].concat(block.class))
  }
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key])
    })
  }
  if (Array.isArray(block)) {
    return block.reduce((f, item) => {
      f.appendChild(
        rowJSEngine(item)
      )
      return f
    }, document.createDocumentFragment())
  }
  if (block.content) {
    element.appendChild(rowJSEngine(block.content))
  }
  return element
}

function rowTemplate (row, num, letters4, letters6) {
  if (row === 6) {
    return {
      tag: 'div',
      class: ['row', 'seating-row', 'text-center'],
      content: [{
          tag: 'div',
          class: ['col-xs-1', 'row-number'],
          content: [{
            tag: 'div',
            class: '',
            content: `${num}`
          }]
        },
        {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[0]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[1]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[2]}`
              }]
            },
          ]
        }, {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[3]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[4]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters6[5]}`
              }]
            }
          ]
        }
      ]
    }
  }
  if (row === 4) {
    return {
      tag: 'div',
      class: ['row', 'seating-row', 'text-center'],
      content: [{
          tag: 'div',
          class: ['col-xs-1', 'row-number'],
          content: [{
            tag: 'div',
            class: '',
            content: `${num}`
          }]
        },
        {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters4[0]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters4[1]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
          ]
        }, {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters4[2]}`
              }]
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'seat'],
              content: [{
                tag: 'span',
                class: 'seat-label',
                content: `${letters4[3]}`
              }]
            }
          ]
        }
      ]
    }
  }
  if (row === 0) {
    return {
      tag: 'div',
      class: ['row', 'seating-row', 'text-center'],
      content: [{
          tag: 'div',
          class: ['col-xs-1', 'row-number'],
          content: [{
            tag: 'div',
            class: '',
            content: `${num}`
          }]
        },
        {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
          ]
        }, {
          tag: 'div',
          class: 'col-xs-5',
          content: [{
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            },
            {
              tag: 'div',
              class: ['col-xs-4', 'no-seat'],
            }
          ]
        }
      ]
    }
  }
}

showSeatMap.addEventListener('click', loadMap)
