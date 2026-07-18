let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

displayTasks();

function addTask(){

    let task=document.getElementById("task").value.trim();
    let date=document.getElementById("date").value;
    let hour=document.getElementById("hour").value;
    let minute=document.getElementById("minute").value;
    let second=document.getElementById("second").value;
    let priority=document.getElementById("priority").value;

    if(task===""){
        alert("Please Enter Task");
        return;
    }

    let newTask={
        text:task,
        date:date,
        hour:hour,
        minute:minute,
        second:second,
        priority:priority,
        completed:false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    document.getElementById("task").value="";
    document.getElementById("date").value="";
    document.getElementById("hour").value="";
    document.getElementById("minute").value="";
    document.getElementById("second").value="";
}

function displayTasks(){

    let taskList=document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach(function(item,index){

        let li=document.createElement("li");

        if(item.completed){
            li.classList.add("completed");
        }

        let time="";

        if(item.hour||item.minute||item.second){
            time=(item.hour||"00")+":"+(item.minute||"00")+":"+(item.second||"00");
        }

        li.innerHTML=`
        <div class="task-content">
            <strong>${item.text}</strong><br>
            <small>${item.date||""} ${time}</small><br>
            <span class="priority ${item.priority.toLowerCase()}">${item.priority} Priority</span>
        </div>

        <div class="task-buttons">
            <button class="complete-btn" onclick="completeTask(${index})">✔</button>
            <button class="edit-btn" onclick="editTask(${index})">✏️</button>
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        </div>
        `;

        taskList.appendChild(li);
    });

    let completed=tasks.filter(item=>item.completed).length;
    let pending=tasks.length-completed;

    document.getElementById("taskCount").innerText=tasks.length;
    document.getElementById("completedCount").innerText=completed;
    document.getElementById("pendingCount").innerText=pending;
}

function completeTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index){

    let newTask=prompt("Edit your task",tasks[index].text);

    if(newTask!==null&&newTask.trim()!==""){

        tasks[index].text=newTask.trim();

        saveTasks();
        displayTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        displayTasks();
    }
}

function clearTasks(){

    if(tasks.length===0){
        alert("No tasks to clear.");
        return;
    }

    if(confirm("Delete all tasks?")){

        tasks=[];

        saveTasks();
        displayTasks();
    }
}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));
}
