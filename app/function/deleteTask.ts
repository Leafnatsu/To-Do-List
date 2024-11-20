import { task } from "@/app/type/Task"

export function deleteTask (id : number ,todoList : task[]): task[] {
    return todoList.filter((item)=>item.id !== id);
  }
