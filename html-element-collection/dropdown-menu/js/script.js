'use strict'
function activateWrapper () {
  wrapper.classList.toggle('active')
}
const wrapper = document.getElementsByClassName('wrapper-dropdown')[0]
wrapper.onclick = activateWrapper
