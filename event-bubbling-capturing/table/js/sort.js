function handleTableClick (event) {
  if (!(event.target.classList.contains('prop__name'))) {
    return
  }
  else {
    const table = document.querySelector('table')
    const field = event.target
    table.setAttribute('data-sort-by', field.dataset.propName)
    if (field.dataset.dir === undefined) {
      field.setAttribute('data-dir', 1)
    }
    else if (field.dataset.dir === '1') {
      field.dataset.dir = -1
    } else {
      field.dataset.dir = 1
    }
    sortTable(field.dataset.propName, parseInt(field.dataset.dir))
  }
}

/********************************
 * Не менять код ниже           *
 ********************************/

const table = document.querySelector('table')
table.addEventListener('click', handleTableClick)
