"use client";

import { useState } from "react"

import { task } from './type/Task';

// import {deleteTask} from "@/app/function/deleteTask"
// import {addTask} from "@/app/function/addTask"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

export default function Home() {

  const [clickCount, setClickCount] = useState<number>(0); // นับจำนวนครั้งที่กดปุ่ม

  const [freeOn, setFreeOn] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง คนว่างงาน
  const [dino, setDino] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง ไดโนเสาร์
  const [moodeng, setMoodeng] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง หมูเด้ง

  const [Inputtask, setTask] = useState<string>(""); // ข้อความใน Input
  const [todoList, setTodoList] = useState<task[]>([]); // รายการ Task

  const [editTask, setEditTask] = useState<number | null>(null);  // สถานะการแก้ไข Task
  const [editText, setEditText] = useState<string>(""); // ข้อความที่จะแก้ไข

  // ฟังชั่นเพิ่ม Task
  function addTask(): void {
    if (Inputtask.trim() === "") {
      setClickCount(clickCount + 1);
      if (clickCount === 4) {
        setFreeOn(true);
      setClickCount(clickCount - 4);
      } return;
    }

    if (Inputtask === "I Am A Dinosaur") {
      setDino(true);
      return;
    }


    if (Inputtask === "หมูเด้ง") {
      setMoodeng(true);
      return;
    }


    const newTask: task = {
      id: Date.now(),
      text: Inputtask,
      completed: false,
      date: new Date().toLocaleDateString(),

    };

    setTodoList([...todoList, newTask]);
    setTask("");
  }

  // ฟังชั่นปิดหน้าต่าง คนว่างงาน
  function closeFree(): void {
    setFreeOn(false);
  }

  // ฟังชั่นปิดหน้าต่าง ไดโนเสาร์
  function closeDino(): void {
    setDino(false);
  }

  // ฟังชั่นปิดหน้าต่าง หมูเด้ง
  function closeMoodeng(): void {
    setMoodeng(false);
  }

  // ฟังค์ชั่นแก้ไข Task
  function edit(id: number): void {
    const tasktoEdit = todoList.find((task) => task.id === id);
    if (tasktoEdit) {

      setEditText(tasktoEdit.text)
      setEditTask(id);
    }
  }

  // ฟังค์ชั่นบันทึกการแก้ไข
  function seveEdit(id: number): void {

    setTodoList(todoList.map((task) => task.id === id ? { ...task, text: editText } : task));

    setEditText("");
    setEditTask(null);
  }

  // ฟังค์ชั่นลบ Task
  function deleteTask(id: number): void {
    setTodoList(todoList.filter((item) => item.id !== id));
    console.log("Keep Deleting And It Won't End.");
  }

  // ฟังค์ชั่นสลับสถานะเสร็จ/ไม่เสร็จ
  function Icandothis(id: number): void {
    setTodoList(todoList.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }


  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] gap-6">
        <h1>To Do List</h1>

        {/* inputข้อมูล */}

        <div className="flex w-full max-w-sm items-center mx-4">
          <Input className=" border-black border-2" type="text" placeholder="What Will You Do?" value={Inputtask} onChange={(even) => setTask(even.target.value)} />

          {/* แจ้งเตือนหน้าต่าง คนว่างงาน */}
          {freeOn ? (<AlertDialog open={freeOn} onOpenChange={closeFree}>
            <AlertDialogTrigger>Add Task</AlertDialogTrigger>
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
            // แจ้งเตือนหน้าต่าง ไดโนเสาร์
          ) : dino ? (<AlertDialog open={dino} onOpenChange={closeDino}>
            <AlertDialogTrigger>Add Task</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Oh! Wait, You Are a Dinosaur?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ok, Follow Me. I Will Take You Home Click Go Home For Your Life.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => window.location.href = "https://dinosaurgame.app/"}>Go Home</AlertDialogAction>
                <AlertDialogCancel onClick={closeDino}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            // แจ้งเตือนหน้าต่าง หมูเด้ง
          ) : moodeng ? (<AlertDialog open={moodeng} onOpenChange={closeMoodeng}>
            <AlertDialogTrigger>Add Task</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>หมูเด้ง หมูเด้ง หมูเด้ง</AlertDialogTitle>
                <AlertDialogDescription>
                  <iframe width="460" height="315" src="https://www.youtube.com/embed/4noyAoMa7bQ?si=ZK-PuMwiVK2GWhYG" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeMoodeng}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            // ปุ่มเพิ่ม Task
          ) : (<Button type="submit" onClick={addTask}>Add Task</Button>)}
        </div>

        {/* ตารางแสดงรายการที่ต้องทำ */}

        <Table>
          <TableCaption>You Must To Do That!!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Things to do</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Tools</TableHead>
            </TableRow>
          </TableHeader>

          {/* ส่วนข้อมูลในตาราง */}

          <TableBody>
            {todoList.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={item.completed}
                    onClick={() => Icandothis(item.id)}
                  />
                  {item.completed === true ? " See? You Made It!!" : " Come On! You Can Do That!!"}
                </TableCell>
                <TableCell>
                  {editTask === item.id ? (
                    <Input
                      type="text"
                      value={editText}
                      onChange={(even) => setEditText(even.target.value)}
                      className=" border-black border-2"
                    />
                  ) : (
                    item.text
                  )}
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  {editTask === item.id ? (
                    <Button type="submit" onClick={() => seveEdit(item.id)}>save</Button>
                  ) : (
                    <Button type="submit" onClick={() => edit(item.id)}>edit</Button>
                  )}
                  <Button type="submit" onClick={() => deleteTask(item.id)}>delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* สิ้นสุดของตาราง */}

      </div>

    </>
  );
}

