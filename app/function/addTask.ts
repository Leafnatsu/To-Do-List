import { task } from "@/app/type/Task"

export function addTask(Inputtask : string , todoList: task[]): task[]{
    if (Inputtask === "") return todoList;

    const newTask: task ={
      id : Date.now(),
      text : Inputtask,
      date : new Date().toLocaleDateString(),
      completed : false,
    };

    return [...todoList , newTask ];
    // setTask("");
  }
