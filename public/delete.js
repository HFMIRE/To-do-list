document.addEventListener('click', function(event){
  const isButton = (event.target.nodeName == 'BUTTON');
  if(isButton){
    const e = event.target;
      taskManager.deleteTask(e);
    }
});
  
class TaskManager {
  constructor(taskA){
    this.allTasks = [];
    this.taskA = taskA;
  }
    
  getAllTasks(){
    console.log(this.allTasks);
  }
    
  addTask(){
          
  let createTask = `<li class="list-group-item draggable" draggable="true">{{this.name}}
                    <i class="fas fa-minus-circle" deleteID="delete"></i> 
                    </li>`
    createTask.innerHTML += createTask;
    console.log(createTask);
  }
  
  deleteTask(e){

    let deleteTaskID = e.parentNode.attributes.taskID.value;

    for(let i=0; i < this.allTasks.length; i++){
      if(this.allTasks[i].ID == deleteTaskID){
        this.allTasks.splice(i,1);
      }
    }

  console.log(this.allTasks);

  e.parentNode.parentNode.removeChild(e.parentNode)

  if(e.attributes.taskID.value == deleteTaskID){
    e.parentNode.removeChild(e);
  }
    console.log(deleteTaskID)
  }
}

let taskManager = new TaskManager();
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
  taskManager.allTasks = JSON.parse(dataReturned);
  populatePage(taskManager.allTasks)
} else {
  taskManager.taskArray = [];
}

function populatePage(array){
  for(let i=0; i < array.length; i++){
    taskManager.addTask(array[i]);
  }
}