let input = document.getElementById('input_field')
let todos = document.getElementById('allTodos')

let allTodos = []

input.addEventListener('keydown', event => {
  if (event.keyCode === 13) addTodo()
})

function deleteOne(id) {
  allTodos.splice(id, 1)
  displayAllItems()
}

function displayAllItems() {
  todos.innerHTML = '' // clear DOM otherwise it will show duplicated array items in DOM

  allTodos.forEach((item, index) => {
    const newLi = document.createElement('div') // create a new div for each item in array

    // add innerHTML to the new div created above
    newLi.innerHTML = `<div class="todo_item"><h1 onclick="done(${index})"  style="text-decoration: ${
      item.done ? 'line-through' : ''
    }">${item.todo} </h1>
    <button onclick="deleteOne(${index})">x</button>
    </div>
    `
    return todos.appendChild(newLi)
  })
}

function addTodo() {
  // check if the input field is filled in
  if (input.value !== '') {
    // if filled in push brand new object into the array
    allTodos.push({ todo: input.value, done: false, id: allTodos.length + 1 })
    input.value = '' // reset the input value to empty

    displayAllItems() // fire this function to display the items
  } else {
    alert('please type an item')
  }
}

function done(id) {
  // find the item that user clicked on
  const itemFound = allTodos.find(x => x.id === id + 1)

  // update the done attribute to true or false
  itemFound.done = itemFound.done ? false : true

  // find item in array, remove it and replace with new itemFound object
  allTodos.splice(id, 1, itemFound)
  displayAllItems()
}

function clearAll() {
  allTodos = []
  displayAllItems()
}
