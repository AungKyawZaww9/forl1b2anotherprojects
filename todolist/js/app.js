// UI

const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');



//Add Task

function addtask(e){
    e.preventDefault();
    // console.log('hey');

    if(taskinput.value === ''){
        window.alert("Add a task");

        return; 
    }
    // else{

    

    // console.log(taskinput.value);

    // create li element
    const li = document.createElement('li');
    li.className = "collection-item";

    //create text node append to li
    li.appendChild(document.createTextNode(taskinput.value));

    
    //create link
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";


    //add icon
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;


    // console.log(link);


    //append link to li
    li.appendChild(link);

    // console.log(li);

    //append li to ul
    tasklist.appendChild(li);


    //storage in localstorage
    storetaskinlocalstorage(taskinput.value);

    taskinput.value = "";
}


//Remove Task

function removetask(e){
    // console.log('hey');
    // console.log(e.target);

    // console.log(e.target.parentElement);

    // i            a     
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('delete item');

        if(confirm('Are your sure')){
            // i            a         li
            e.target.parentElement.parentElement.remove();

        }

    }


    // Remove task from loaclstorage
                                // i       a            li
    removetaskfromloaclstorage(e.target.parentElement.parentElement);
    
}


//Clear Tasks

function cleartasks(){
    // console.log('hey');

    //Mehtod 1
    // tasklist.innerHTML = '';

    //Method 2
    // console.log(tasklist);
    // console.log(tasklist.childElementCount);

    // let x = 0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
    // }


    // Method 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    cleartasksfromlocalstorage();


}


//Store Task
function storetaskinlocalstorage(task){
    // console.log(task);

    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }

    tasks.push(task);

    // localStorage.setItem('tasks',tasks);
    localStorage.setItem("tasks",JSON.stringify(tasks));

    // console.log(tasks)
    // console.log(typeof tasks);


    
    
}



//Get tasks From localStorage

function gettasks(){
    // console.log('hey');

    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // console.log(tasks);
    tasks.forEach((task)=>{
        // console.log(task);

        // create li Element
        const li = document.createElement('li');

        // add class
        li.className = "collection-item";

        // create text node and append to li
        li.appendChild(document.createTextNode(task));


        // create new link element
        const link = document.createElement('a');

        // add class
        link.className = "delete-item secondary-content";

        // add icon
        link.innerHTML =  `<i class="far fa-trash-alt"></i>`;
        // console.log(link);

        // append link into li
        li.appendChild(link);
        // console.log(li);

        // append li into ul
        tasklist.appendChild(li);

        

    });
}

// gettasks();


// Remove task from localStorage
function removetaskfromloaclstorage(taskitem){
    // console.log('hey');
    // console.log(taskitem);
    // console.log(taskitem.innerHTML);
    // console.log(taskitem.textContent);


    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    

    tasks.forEach((task,index)=>{

        // console.log(task);
        if(taskitem.textContent === task){
            // where we want to start(index) , where we want to end(1)
            tasks.splice(index,1);
        }


    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Clear All Data from localstorage
function cleartasksfromlocalstorage(){
    localStorage.clear();
}


//Filter Task
function filtertasks(e){
    // console.log("hey");
    // console.log(e.target.value);

    const inputfilter = e.target.value.toLowerCase();
    // console.log(inputfilter);

    const tasks = document.querySelectorAll('.collection-item');
    // console.log(tasks);

    tasks.forEach((task)=>{
        // console.log(task);

        const item = task.firstChild.textContent.toLowerCase();
        // console.log(item);

        if(item.indexOf(inputfilter) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }   
    });


}






// Event listener

//Add Task
form.addEventListener('submit',addtask);

//Remove task
tasklist.addEventListener('click',removetask);

//CLear Tasks
clearbtn.addEventListener('click',cleartasks);

//DOM Load Event
document.addEventListener('DOMContentLoaded',gettasks);

//Filter task event
filter.addEventListener('keyup',filtertasks);




