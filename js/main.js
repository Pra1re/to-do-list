const x = document.getElementById("input-box");
x.value = "";

const bt = document.getElementById("button");
bt.addEventListener("click", () => {
    const list = document.getElementById("list");
    const value = x.value;

    if (value !== null && value !== "") {
        const taskObj = {
            value: value,
            timeAdded: getCurrentTime(),
            subtopics: [],
            doneTime: null,
        };

        addTaskToDOM(taskObj);  // Add task to DOM

        // Save the task in local storage
        saveToLocalStorage(taskObj);

        x.value = ""; // Clear the input box
    }
});

// Function to get current time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function addTaskToDOM(task) {
    const list = document.getElementById("list");
    const newdiv = document.createElement('div');
    newdiv.className = "mb-6";

    newdiv.innerHTML = `
    <div class="flex gap-6 items-center mb-1">
        <li class="font-bold text-xl w-[40%] bg-red-400 py-4 rounded-[8px]">${task.value}</li>
        <button class="btn" onclick="subadd(this)">Subtopic</button>
        <button class="btn" onclick="strike(this)">Done</button>
        <button class="btn" onclick="delmain(this)">Delete</button>
        <p id="date" class="font-bold text-lg">Task Added: ${task.timeAdded}</p>
        <p class="done font-bold text-lg">${task.doneTime ? `Task Done: ${task.doneTime}` : ""}</p>
    </div>`;
    
    list.append(newdiv);

    // Add existing subtopics (if any)
    if (task.subtopics && task.subtopics.length > 0) {
        task.subtopics.forEach(subtopic => {
            addSubtopicToDOM(subtopic, newdiv);
        });
    }
}

// Save task to local storage
function saveToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
};

// Mark task as done and update local storage
function strike(button) {
    const parent = button.parentElement;
    const lis = parent.querySelector('li');
    if (lis) {
        lis.style.textDecoration = "line-through";
    }

    const now = getCurrentTime();
    const done = parent.querySelector('.done');
    done.textContent = `Task Done: ${now}`;

    // Update the task in local storage
    updateTaskInLocalStorage(lis.textContent, now);
}

function updateTaskInLocalStorage(taskValue, doneTime) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.value === taskValue) {
            task.doneTime = doneTime;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add subtopic
function subadd(button) {
    const subtopicsDiv = button.parentElement.parentElement;
    const taskValue = button.parentElement.querySelector('li').textContent;

    const tempInputDiv = document.createElement("div");
    tempInputDiv.className = "flex gap-2 items-center mt-2";

    const tempInput = document.createElement("input");
    tempInput.type = "text";
    tempInput.placeholder = "Enter subtopic";
    tempInput.className = "input input-bordered w-[50%] mt-2";

    const addButton = document.createElement("button");
    addButton.className = "btn w-[15%]";
    addButton.textContent = "Submit";

    tempInputDiv.append(tempInput, addButton);
    subtopicsDiv.append(tempInputDiv);

    addButton.addEventListener("click", () => {
        const subtopicValue = tempInput.value.trim();
        if (subtopicValue !== "") {
            // Add the subtopic to the DOM
            addSubtopicToDOM(subtopicValue, subtopicsDiv);

            // Update local storage with the new subtopic
            addSubtopicToLocalStorage(taskValue, subtopicValue);

            tempInput.value = "";
            tempInputDiv.remove();
        }
    });
}

function addSubtopicToDOM(subtopicValue, subtopicsDiv) {
    const newdiv = document.createElement("ul");
    newdiv.className = "list-disc ml-12 flex gap-6 items-center font-bold text-lg mb-4 mt-2";
    newdiv.innerHTML = `
        <li class="w-[45%] bg-slate-200 p-4 rounded-[16px] mr-6">${subtopicValue}</li>
        <button class="btn" onclick="strike(this)">Done</button>
        <button class="btn mr-0" onclick="del(this)">Delete</button>
        <p class="done font-bold text-lg"></p>
    `;
    subtopicsDiv.append(newdiv);
}

function addSubtopicToLocalStorage(taskValue, subtopicValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.value === taskValue) {
            task.subtopics.push(subtopicValue);
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete main task and update local storage
function delmain(button) {
    const getparent = button.parentElement.parentElement;
    const taskValue = getparent.querySelector('li').textContent;
    getparent.remove();

    // Remove task from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.value !== taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function del(button) {
    const getparent = button.parentElement;
    const taskValue = button.parentElement.parentElement.querySelector('li').textContent;
    const subtopicValue = getparent.querySelector('li').textContent;
    getparent.remove();

    // Remove subtopic from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.value === taskValue) {
            task.subtopics = task.subtopics.filter(sub => sub !== subtopicValue);
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
