let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// // Load saved tasks
displayTasks();

// Add Task
function addTask(){
    let task = document.getElementById("task").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if(task === ""){
        alert("Please Enter Task");
        return;
    }

    let newTask = {
        text: task,
        date: date,
        time: time,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();

    // Input clear
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
}

// Display Task
function displayTasks(){
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(function(item,index){
        let li = document.createElement("li");
        if(item.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
        <span>
            ${item.text}
            <br>
            <small>${item.date || ""} ${item.time || ""}</small>
        </span>

        <div class="task-buttons">
            <button onclick="completeTask(${index})">
                ✔
            </button>

            <button onclick="editTask(${index})">
                ✏️
            </button>

            <button onclick="deleteTask(${index})">
                ❌
            </button>
        </div>
         `;
        taskList.appendChild(li);
    });
    document.getElementById("taskCount").innerText = tasks.length;
}

// Complete Task
function completeTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Edit Task
function editTask(index){
    let newTask = prompt(
        "Edit your task",
        tasks[index].text
    );

    if(newTask !== null && newTask.trim() !== ""){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}

// Delete Task
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}

// Clear All Task
function clearTasks(){
    if(confirm("Delete all tasks?")){
        tasks = [];
        saveTasks();
        displayTasks();
    }
}

// Save Task in Local Storage
function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}