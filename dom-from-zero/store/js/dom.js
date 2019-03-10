'use strict'
function createElement (node) {
  const element = document.createElement(node.name)
  if (node.props) {
    Object.keys(node.props).forEach(key => {
      element.setAttribute(key, node.props[key])
    })
  }
  if (node.childs) {
    node.childs.forEach((child) => {
      console.log(child)
      if (typeof child === 'string') {
        element.textContent = child
      } else {
        element.appendChild(createElement(child))
      }
    })
  }
  return element
}
