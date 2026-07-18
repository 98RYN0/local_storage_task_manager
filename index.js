const taskInputEl = document.getElementById("new-task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const taskContainer = document.getElementById("task-container")
const taskList = document.getElementById("task-list")

let tasksArr = []

addTaskBtn.addEventListener('click', function(){
    if (taskInputEl.value){
        tasksArr.push(taskInputEl.value)
        taskInputEl.value = ''
    }
    renderTasks()
})

function renderTasks() {
    let taskHtml = ''
    tasksArr.map(task => {
        taskHtml += `<li class="task">${task}</li>`
    }).join()
    console.log(taskHtml)
    taskList.innerHTML = taskHtml
    if (taskHtml && taskList.classList.contains('hidden')){taskList.classList.toggle('hidden')}
}