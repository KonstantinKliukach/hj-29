'use strict'

function showComments (list) {
  console.log(list)
  const commentsContainer = document.querySelector('.comments')
  commentsContainer.appendChild(
    commentJSEngine(list.map(commentTemplate))
  )
}

function commentTemplate (comment) {
  return {
    tag: 'div',
    class: 'comment-wrap',
    content: [{
        tag: 'div',
        class: 'photo',
        attrs: {
          title: comment.author.name
        },
        content: {
          tag: 'div',
          class: 'avatar',
          attrs: {
            style: `background-image: url(${comment.author.pic})`
          },
        }
      },
      {
        tag: 'div',
        class: 'comment-block',
        content: [{
            tag: 'p',
            class: 'comment-text',
            content: `${comment.text.split('<br').join('\n')}`
          },
          {
            tag: 'div',
            class: 'bottom-comment',
            content: [{
                tag: 'div',
                class: 'comment-date',
                content: `${new Date(comment.date).toLocaleString('ru-Ru')}`
              },
              {
                tag: 'ul',
                class: 'comment-actions',
                content: [{
                    tag: 'li',
                    class: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    class: 'reply',
                    content: 'ответить'
                  },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function commentJSEngine (block) {
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
        commentJSEngine(item)
      )
      return f
    }, document.createDocumentFragment())
  }
  if (block.content) {
    element.appendChild(commentJSEngine(block.content))
  }
  element.style.whiteSpace = 'pre'
  return element
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments)
