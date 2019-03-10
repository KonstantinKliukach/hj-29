const tabs = document.getElementsByClassName('tabs-nav')[0]
const content = document.getElementsByClassName('tabs-content')[0]
const articles = content.children

function switchTab () {
  let activeTab = tabs.getElementsByClassName('ui-tabs-active')[0]
  for (let article of articles) {
    if (!article.classList.contains('hidden')) {
      article.classList.add('hidden')
    }
    if (article.dataset.tabTitle === event.currentTarget.textContent) {
      article.classList.remove('hidden')
    }
  }
  activeTab.classList.remove('ui-tabs-active')
  event.currentTarget.classList.add('ui-tabs-active')
}

function createTabs (article, demo) {
  const demoTab = tabs.firstElementChild.cloneNode(true)
  tabs.appendChild(demoTab)
  let newTab = tabs.lastElementChild
  let link = newTab.getElementsByTagName('a')[0]
  link.textContent = article.dataset.tabTitle
  newTab.firstElementChild.classList.add(article.dataset.tabIcon)
  newTab.addEventListener('click', switchTab)
}

for (let article of articles) {
  createTabs(article)
  article.classList.add('hidden')
}

tabs.firstElementChild.remove()
tabs.firstElementChild.classList.add('ui-tabs-active')
content.firstElementChild.classList.remove('hidden')
