"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction ,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

// กำหนด type สำหรับ Task แต่ละรายการ
type Task = {
  id: number; // ID ของ Task
  text: string; // ข้อความของ Task
  completed: boolean; // สถานะเสร็จ/ไม่เสร็จ
  date: string; // วันที่สร้าง Task
};

export default function Home() {
  const [task, setTask] = useState<string>(""); // State สำหรับข้อความใน Input
  const [todoList, setTodoList] = useState<Task[]>([]); // State สำหรับรายการ To-Do
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // State สำหรับการเก็บ ID ของ Task ที่กำลังแก้ไข
  const [editedText, setEditedText] = useState<string>(""); // State สำหรับข้อความที่จะแก้ไข
  const [clickCount, setClickCount] = useState<number>(0);
  const [freeOn, setFreeOn] = useState<boolean>(false);
  const [dino, setDino] = useState<boolean>(false);

  // ฟังก์ชันสำหรับเพิ่ม Task
  function addTask(): void {
    if (task.trim() === "") {
      setClickCount(clickCount + 1);
      if (clickCount === 3) {
        setFreeOn(true);
        // console.log("WoW! I Thing You Must To Do Something.");
      }
      return;
    }
    if (task === "Dinosaur") {
      setDino(true)
      return;
    }


    const newTask: Task = {
      id: Date.now(), // ใช้ timestamp เป็น ID
      text: task,
      completed: false,
      date: new Date().toLocaleDateString(), // วันที่ปัจจุบัน
    };

    setTodoList([...todoList, newTask]); // เพิ่ม Task ใหม่
    setTask(""); // ล้าง input หลังจากเพิ่ม Task
  }

  function closeFree(): void {
    setFreeOn(false);
  }

  function closeDino(): void {
    setDino(false);
  }

  // ฟังก์ชันลบ Task
  function deleteTask(id: number): void {
    setTodoList(todoList.filter((item) => item.id !== id));
    console.log("Keep Deleting And It Won't End.");
  }

  // ฟังก์ชันสลับสถานะเสร็จ/ไม่เสร็จ
  function toggleCompleted(id: number): void {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  // ฟังก์ชันสำหรับเริ่มต้นการแก้ไข Task
  function editTask(id: number): void {
    const taskToEdit = todoList.find((task) => task.id === id); // หาข้อมูล Task ที่ต้องการแก้ไข
    if (taskToEdit) {
      setEditedText(taskToEdit.text); // กำหนดข้อความที่จะแก้ไข
      setEditingTaskId(id); // ตั้งค่า ID ของ Task ที่กำลังแก้ไข
    }
  }

  // ฟังก์ชันสำหรับบันทึกการแก้ไข Task
  function saveEditedTask(): void {
    if (editingTaskId === null || editedText.trim() === "") return;

    setTodoList(
      todoList.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedText } : task
      )
    );
    setEditedText(""); // ล้างข้อความที่แก้ไข
    setEditingTaskId(null); // รีเซ็ตการแก้ไข
  }

  // ฟังก์ชันสำหรับอัปเดตข้อความที่กำลังแก้ไข
  // function handleEditTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   setEditedText(event.target.value);
  // }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] gap-6">
      <h1>To Do List</h1>
      <div className="flex w-full max-w-sm items-center mx-4">
        {/* Input สำหรับกรอก Task */}
        <Input
          type="text"
          placeholder="What Will You Do?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input-class border-black border-2"

        />
        {/* ปุ่มเพิ่ม Task */}
        {freeOn ? (
          <AlertDialog open={freeOn} onOpenChange={closeFree}>
            <AlertDialogTrigger><Button>Add Task</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Seriously?! Are You Free?</AlertDialogTitle>
                <AlertDialogDescription>
                  Go Out And Find Something You Can Do.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeFree}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : dino ? (
          <AlertDialog open={dino} onOpenChange={closeDino}>
            <AlertDialogTrigger><Button>Add Task</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Oh! Wait, You Are a Dinosaur?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ok, Follow Me. I Will Take You Home :
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => window.location.href = "https://dinosaurgame.app/"}>Go Home</AlertDialogAction>
                <AlertDialogCancel onClick={closeDino}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (<Button type="button" onClick={addTask}>
          Add Task
        </Button>)}
      </div>

      {/* ตาราง To-Do */}
      <Table>
        <TableCaption>Your Task List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Things to do</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Tools</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoList.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Checkbox
                  checked={item.completed}
                  onClick={() => toggleCompleted(item.id)}
                />
                {item.completed === true ? " See? You Can Do That!!" : " Come On! You Must To Do That!!"}
              </TableCell>

              {/* ถ้า Task กำลังอยู่ในสถานะที่กำลังแก้ไข */}
              <TableCell>
                {editingTaskId === item.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(even) => setEditedText(even.target.value)}
                    className="input-class  border-black border-2"
                  />
                ) : (
                  item.text
                )}
              </TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right">
                {/* แสดงปุ่ม Edit หรือ Save ขึ้นอยู่กับสถานะการแก้ไข */}
                {editingTaskId === item.id ? (
                  <Button onClick={saveEditedTask}>Save</Button>
                ) : (
                  <Button onClick={() => editTask(item.id)}>Edit</Button>
                )}
                <Button onClick={() => deleteTask(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


// อันนี้เป็นโค้ดจากgptไม่เอาส่งแค่เอามาลองดูการทำงารมันของมัน
