// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


// Function
const addTodo = (event) => {
    // prevent form from submitting
    event.preventDefault()

    // todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")

    // append
    todoDiv.appendChild(newTodo)

    // add todo to local storage
    saveLocalTodos(todoInput.value)

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    // TRASH BUTTON
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    // APPEND TO LIST
    todoList.appendChild(todoDiv)

    // CLEAR TODO INPUT VALUE
    todoInput.value = ''
}

const deleteCheck = (e) => {
    const item = e.target

    // DELETE TODO  
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement

        // animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    }

    // CHECK MARK     
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

const filterTodo = (e) => {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

const saveLocalTodos = (todo) => {
    // check ->->- hey do I already have anything in there 
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    // check ->->- hey do I already have anything in there 
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach((todo) => {


        // todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // create li
        const newTodo = document.createElement("li")
        newTodo.innerText = todo
        newTodo.classList.add("todo-item")

        // append
        todoDiv.appendChild(newTodo)

        // CHECK MARK BUTTON
        const completedButton = document.createElement("button")
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)

        // TRASH BUTTON
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        // APPEND TO LIST
        todoList.appendChild(todoDiv)


    })
}

const removeLocalTodos = (todo) => {
    // check ->->- hey do I already have anything in there 
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Event Listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

document.addEventListener("DOMContentLoaded", getTodos)