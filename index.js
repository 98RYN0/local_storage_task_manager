const taskInputEl = document.getElementById("new-task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const taskContainer = document.getElementById("task-container")
const taskList = document.getElementById("task-list")

let tasksArr = []
let taskIdCounter = 0

addTaskBtn.addEventListener('click', function(){
    if (taskInputEl.value){
        let newTask = {id: taskIdCounter++, text: taskInputEl.value, completed: false}
        tasksArr.push(newTask)
        taskInputEl.value = ''
        renderTasks()
    }
})

taskContainer.addEventListener('click', function(e){
    if (e.target.classList.contains("complete-task-btn")){
        let taskId = e.target.parentElement.id
        tasksArr.forEach(task => {
            if (task.id === Number(taskId)){task.completed = !task.completed}
        })
        renderTasks()
    }
    else if (e.target.classList.contains("delete-task-btn")){
        let taskId = e.target.parentElement.id
        tasksArr = tasksArr.filter(task => task.id !== Number(taskId))
        renderTasks()
    }
})

function renderTasks() {
    let taskHtml = ''
    taskHtml = tasksArr.map(task => {
        return `<li class="task ${task.completed ? 'completed' : ''}" id="${task.id}">${task.text}<button class="complete-task-btn">Complete Task</button><button class="delete-task-btn">Delete Task</button></li>`
    }).join('')
    taskList.innerHTML = taskHtml
    if (taskHtml && taskList.classList.contains('hidden')){taskList.classList.toggle('hidden')}
}