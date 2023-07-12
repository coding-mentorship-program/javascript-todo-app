let input = document.getElementById('input_field')
let todos = document.getElementById('allTodos')

let allTodos = JSON.parse(localStorage.getItem('user_todos')) ? JSON.parse(localStorage.getItem('user_todos')) : []

input.addEventListener('keydown', event => {
  if (event.keyCode === 13) addTodo()
})

function updateLocalStorage() {
  localStorage.setItem('user_todos', JSON.stringify(allTodos))
}

function displayAllItems() {
  todos.innerHTML = '' // clear DOM otherwise it will show duplicated array items in DOM

  allTodos.forEach((item, index) => {
    const newLi = document.createElement('div') // create a new div for each item in array

    // add innerHTML to the new div created above
    newLi.innerHTML = `<div class="todo_item"><h1 onclick="done(${item.id})"  style="text-decoration: ${
      item.done ? 'line-through' : ''
    }">${item.todo} </h1>
    <button onclick="deleteOne(${index})">x</button>
    </div>
    `
    return todos.appendChild(newLi)
  })
}

displayAllItems()

function deleteOne(index) {
  allTodos.splice(index, 1)
  updateLocalStorage()
  displayAllItems()
}

function addTodo() {
  // check if the input field is filled in
  if (input.value !== '') {
    // if filled in push brand new object into the array
    allTodos.push({ todo: input.value, done: false, id: allTodos.length + 1 })
    input.value = '' // reset the input value to empty

    updateLocalStorage()

    displayAllItems() // fire this function to display the items
  } else {
    alert('please type an item')
  }
}

function done(id) {
  // find item in array, remove it and replace with new itemFound object
  for (const i of allTodos) {
    // update the done attribute to true or false
    if (i.id === id) i.done ? (i.done = false) : (i.done = true)
  }

  // update local storage with updated array of items
  updateLocalStorage()
  displayAllItems()
}

function clearAll() {
  allTodos = []
  localStorage.clear()
  displayAllItems()
}
