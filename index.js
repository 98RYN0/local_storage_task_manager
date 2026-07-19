const taskInputEl = document.getElementById("new-task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const taskContainer = document.getElementById("task-container")
const taskList = document.getElementById("task-list")

const storedData = localStorage.getItem('tasks')
let taskArr = []
let taskIdCounter = 1
getStoredData()
renderTasks()
console.log(taskArr)


addTaskBtn.addEventListener('click', function(){
    if(taskInputEl.value){
        let newTask = {id: taskIdCounter++, text: taskInputEl.value, completed: false}
            taskArr.push(newTask)
            taskInputEl.value = ''
            saveData(newTask.id, newTask)
            renderTasks()
    }
})

taskContainer.addEventListener('click', function(e){
    if (e.target.classList.contains("complete-task-btn")){
        let taskId = e.target.parentElement.id
        taskArr.forEach(task => {
            if (task.id === Number(taskId)){
                task.completed = !task.completed
                saveData(task.id, task)
            }
        })
        renderTasks()
    }
    else if (e.target.classList.contains("delete-task-btn")){
        let taskId = e.target.parentElement.id
        taskArr = taskArr.filter(task => task.id !== Number(taskId))
        localStorage.removeItem('task '+ taskId)
        taskIdCounter--
        renderTasks()
    }
})

function saveData(key, value) {
    localStorage.setItem('task '+ key, JSON.stringify(value))
}

function getStoredData() {
    const keys = Object.keys(localStorage)
    taskArr = keys.map(key => JSON.parse(localStorage.getItem(key)))
    if (taskArr.length > 0) {taskIdCounter = taskArr.length++}
}

function renderTasks() {
    let taskHtml = ''
    taskHtml = taskArr.map(task => {
        return `
        <li class="task ${task.completed ? 'completed' : ''}" id="${task.id}">${task.text}
            <button class="complete-task-btn">Complete Task</button>
            <button class="delete-task-btn">Delete Task</button>
        </li>`
    }).join('')
    taskList.innerHTML = taskHtml
    if (taskHtml && taskList.classList.contains('hidden')){taskList.classList.toggle('hidden')}
}