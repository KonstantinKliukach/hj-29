const contacts = JSON.parse(loadContacts())
const contactsList = document.getElementsByClassName('contacts-list')[0]

function contactsCreate () {
  contactsList.innerHTML = ''
  for (let contact of contacts) {
    contactsList.innerHTML = contactsList.innerHTML + `<li data-email="${contact.email}" data-phone="${contact.phone}">     <strong>${contact.name}</strong></li>`
  }
}

contactsCreate()
