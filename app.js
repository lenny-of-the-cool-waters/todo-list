// Selectors
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Functions
function addTodo(event) {
    event.preventDefault();
    // To-do div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // To-do li
    let newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Completed button
    let completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Adding to localStorage
    saveLocalTodos(todoInput.value);
    // Clear input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;
    //  Delete to-do
    if(item.classList.contains("delete-btn")) {  
        /* Animation */ 
        todo.classList.add("fall");     
        todo.addEventListener('transitionend', () => {
            todo.remove();            
        });
        removeLocalTodo(todo);
    }
    // Complete todo
    if(item.classList.contains("completed-btn")) {
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });
}

function saveLocalTodos(todo) {
    // check local storage for todos
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        // To-do div
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // To-do li
        let newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Completed button
        let completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // Get todo text from li
    const todoText = todo.children[0].innerText;
    const todoIndex = todos.indexOf(todoText);
    console.log(todoIndex);
    // Remove item from todos array
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
window.addEventListener("DOMContentLoaded", getTodos);
todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);