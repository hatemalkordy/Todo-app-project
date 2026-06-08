let light = document.querySelector(".light-icon");
let dark = document.querySelector(".dark-icon");

const savedTheme = localStorage.getItem('data-theme');
if (savedTheme === 'Light') {
    document.body.setAttribute('data-theme', 'Light');
    light.classList.remove('active');
    dark.classList.add('active');
}
light.addEventListener('click', function() {
    if(light.classList.contains('active')) {
        light.classList.remove('active');
        dark.classList.add('active');
        document.body.setAttribute('data-theme', 'Light');
        localStorage.setItem('data-theme', 'Light');
    }
})

dark.addEventListener('click', function() {
    if(dark.classList.contains('active')) {
        dark.classList.remove('active');
        light.classList.add('active');
        document.body.removeAttribute('data-theme');
        localStorage.setItem('data-theme', 'Dark');
    }
})

// start with inputs 

const input = document.querySelector(".input-task");
const todoList = document.querySelector(".todo-list");

let form = document.querySelector(".todo-form");
let todoArray = JSON.parse(localStorage.getItem("todoList")) || [];

function updatePage() {
    todoList.innerHTML = "";
    todoArray.forEach((task, index) => {

        let completedClass = task.completed ? "completed" : "";

        todoList.innerHTML += `
        <li class="${completedClass}">
        <div class="todo-left-side">
            <div class="circle-placeholder" onclick="toggleTask(${index})">
                <img src="images/icon-check.svg" alt="Check" class="check-icon">
            </div>
            <span class="todo-text">${task.text}</span>
        </div>
        <img onclick="deleteTask(${index})" src="images/icon-cross.svg" alt="Delete">
        </li>`;
    });
    localStorage.setItem("todoList", JSON.stringify(todoArray));

    updateItemsCount();
}

updatePage();

form.onsubmit = function (event) {
    event.preventDefault(); 
    
    if (input.value.trim() !== "") {
        // todoArray.push(input.value.trim());
        todoArray.push({ text: input.value.trim(), completed: false });
        input.value = "";
        updatePage(); 
    }
};

function deleteTask(index) {
    todoArray.splice(index, 1); 
    updatePage();                
}

function toggleTask(index) {
    todoArray[index].completed = !todoArray[index].completed;
    updatePage();
}

//  socend stage

function updateItemsCount() {
    let tempActive = []; 
    
    for (let i = 0; i < todoArray.length; i++) {
        if (todoArray[i].completed === false) {
            tempActive.push(todoArray[i]); 
        }
    }

    let lefts = document.querySelector("#left-items");
    if (lefts) {
        lefts.innerText = `${tempActive.length} items left`;
    }
}


// all btn
let all = document.querySelector("#all"); 

all.addEventListener('click', function() {
    
    completedItems.classList.remove("active");
    activeItems.classList.remove("active");
    all.classList.add("active");

    let listElements = todoList.querySelectorAll("li");

    listElements.forEach(li => {
        li.style.display = "flex"; 
    });
});


// active btn
let activeItems = document.querySelector("#active-items"); 

activeItems.addEventListener('click', function() {
    
    all.classList.remove("active");
    completedItems.classList.remove("active");
    activeItems.classList.add("active");

    let listElements = todoList.querySelectorAll("li");
    
    todoArray.forEach((task, i) => {
        if (task.completed === true) {
            listElements[i].style.display = "none"; 
        } else {
            listElements[i].style.display = "flex";  
        }
    });
});

// completed btn
let completedItems = document.querySelector("#completed-items"); 

completedItems.addEventListener('click', function() {
    
    all.classList.remove("active");
    activeItems.classList.remove("active");
    completedItems.classList.add("active");
    
    let listElements = todoList.querySelectorAll("li");
    
    todoArray.forEach((task, i) => {
        if (task.completed === true) {
            listElements[i].style.display = "flex"; 
        } else {
            listElements[i].style.display = "none";  
        }
    });
});

//  clear btn
//  clear btn
let clearBtn = document.querySelector("#clear-btn"); 

clearBtn.addEventListener('click', function() {
    
    all.classList.remove("active");
    activeItems.classList.remove("active");
    completedItems.classList.remove("active");

    todoArray = todoArray.filter(task => task.completed === false);
    updatePage();
});

// clearBtn.addEventListener('click', function() {
    
//     all.classList.remove("active");
//     activeItems.classList.remove("active");
//     completedItems.classList.remove("active");

//     let tempArray = []; 
    
//     for (let i = 0; i < todoArray.length; i++) {
//         if (todoArray[i].completed === false) {
//             tempArray.push(todoArray[i]);
//         }
//     }

//     todoArray = tempArray;
//     updatePage();
// });
