const buttonSend = document.querySelector('.contentform .button-contact')
const buttonChange = document.querySelector('main .button-contact')
const fields = document.getElementsByTagName('input')
const letterFields = document.getElementsByTagName('output')
const text = document.getElementsByTagName('textarea')[0]
const form = document.getElementsByClassName('contentform')[0]
const main = document.getElementsByTagName('main')[0]

function sendMessage () {
  event.preventDefault()
  form.classList.add('hidden')
  main.classList.remove('hidden')
}

function changeMessage () {
  event.preventDefault()
  main.classList.add('hidden')
  form.classList.remove('hidden')
}

function checkAllFilled () {
  let fieldsArray = Array.from(fields)
  let emptyFields = fieldsArray.filter(field => field.value === '')
  if ((!emptyFields.length) && (text.value !== '')) {
    buttonSend.disabled = false
  } else {
    buttonSend.disabled = true
  }
}

function changeField () {
  checkAllFilled()
  let outputArray = Array.from(letterFields)
  let fieldIndex = outputArray.findIndex(field => field.id === event.currentTarget.name)
  letterFields[fieldIndex].value = event.currentTarget.value
}

buttonSend.addEventListener('click', sendMessage)
buttonChange.addEventListener('click', changeMessage)

for (let field of fields) {
  if (field.name === 'phone') {
    field.type = 'number'
  }
  field.addEventListener('change', changeField)
  text.addEventListener('change', changeField)
}
