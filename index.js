const taskInputEl = document.getElementById("new-task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const taskContainer = document.getElementById("task-container")
const taskList = document.getElementById("task-list")

let taskArr = []
let taskIdCounter = 0
getStoredData()
renderTasks()


addTaskBtn.addEventListener('click', function(){
    if(taskInputEl.value){
        let newTask = {id: taskIdCounter++, text: taskInputEl.value, completed: false}
            taskArr.push(newTask)
            taskInputEl.value = ''
            saveData()
            renderTasks()
    }
})

taskContainer.addEventListener('click', function(e){
    if (e.target.classList.contains("complete-task-btn")){
        let taskId = e.target.parentElement.id
        taskArr.forEach(task => {
            if (task.id === Number(taskId)){
                task.completed = !task.completed
                saveData()
            }
        })
        renderTasks()
    }
    else if (e.target.classList.contains("delete-task-btn")){
        let taskId = e.target.parentElement.id
        taskArr = taskArr.filter(task => task.id !== Number(taskId))
        if (taskArr.length >= 1){saveData(); renderTasks()}
        else {localStorage.clear(); renderTasks()}  
    }
})

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
}

function getStoredData() {
    const stored = localStorage.getItem('tasks')
    if (stored) {
        taskArr = JSON.parse(stored)
        taskIdCounter = taskArr.length > 0 ? Math.max(...taskArr.map(task => task.id))+1 : 0
    }
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