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
  const [deleteCount, setDeleteCount] = useState<number>(0); // นับจำนวนครั้งที่กดปุ่มลบ

  const [freeOn, setFreeOn] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง คนว่างงาน
  const [dino, setDino] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง ไดโนเสาร์
  const [moodeng, setMoodeng] = useState<boolean>(false); // สถานะการแสดงหน้าต่าง หมูเด้ง
  const [lazy, setLazy] = useState<boolean>(false); // สถานะความขี้เกียจของผู้สร้าง

  const [Inputtask, setTask] = useState<string>(""); // ข้อความใน Input
  const [todoList, setTodoList] = useState<task[]>([]); // รายการ Task

  const [editTask, setEditTask] = useState<number | null>(null);  // สถานะการแก้ไข Task
  const [editText, setEditText] = useState<string>(""); // ข้อความที่จะแก้ไข

  // ฟังก์ชั่นเพิ่ม Task
  function addTask(): void {
    if (Inputtask.trim() === "") {
      setClickCount(clickCount + 1);
      if (clickCount === 4) {
        setFreeOn(true);
      setClickCount(0);
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

  // ฟังก์ชั่นปิดหน้าต่าง คนว่างงาน
  function closeFree(): void {
    setFreeOn(false);
  }

  // ฟังก์ชั่นปิดหน้าต่าง ไดโนเสาร์
  function closeDino(): void {
    setDino(false);
  }

  // ฟังก์ชั่นปิดหน้าต่าง หมูเด้ง
  function closeMoodeng(): void {
    setMoodeng(false);
  }

  // ฟังก์ชั่นขี้เกียจ
  function lazybutton(): void {
    setLazy(!lazy);
  }

  // ฟังก์ชั่นแก้ไข Task
  function edit(id: number): void {
    const tasktoEdit = todoList.find((task) => task.id === id);
    if (tasktoEdit) {

      setEditText(tasktoEdit.text)
      setEditTask(id);
    }
  }

  // ฟังก์ชั่นบันทึกการแก้ไข
  function seveEdit(id: number): void {

    setTodoList(todoList.map((task) => task.id === id ? { ...task, text: editText } : task));

    setEditText("");
    setEditTask(null);
  }

  // ฟังก์ชั่นลบ Task
  function deleteTask(id: number): void {
    const tasktoDelete = todoList.find((task) => task.id === id);
    if (!tasktoDelete) return;

    if (tasktoDelete.completed === false) {
      setDeleteCount(deleteCount + 1);
      console.log(deleteCount)
      if (deleteCount === 6) {
      setDeleteCount(0);
        setTodoList(todoList.filter((item) => item.id !== id));
      }
      return;
    }
    setTodoList(todoList.filter((item) => item.id !== id));
  }
  // ฟังก์ชั่นแสดงข้อความก่อนลบ
  function dontdothat(deleteCount:number): string {

    switch(deleteCount) {

      case 1 :
        return "Really? Ahh, Nope!";
      case 2 :
        return "Nice Try, But You Can't.";
      case 3 :
        return "I Can Do This All Day!";
      case 4 :
        return "Ok, You Know What? I Give Up—Let's Do It.";
      case 5 :
        return "Sorry, Nope! LOL, Ha Ha Ha! 😂";
      case 6 :
        return "Really? This Last Chance You Know?";
      default :
        return "To Do List";
    }
  }

  // ฟังก์ชั่นสลับสถานะเสร็จ/ไม่เสร็จ
  function Icandothis(id: number): void {
    setTodoList(todoList.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }





  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] gap-6">
          {/* เรียกใช้ฟังก์ชันแสดงข้อความก่อนลบ */}
        <h1>{dontdothat(deleteCount)}</h1>
        {/* inputข้อมูล */}

        <div className="flex w-full max-w-sm items-center mx-4">
          <Input className=" border-black border-2 mx-1" type="text" placeholder="What Will You Do?" value={Inputtask} onChange={(even) => setTask(even.target.value)} />

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
          <TableCaption>
            {lazy === true ? "Do You Know Anything? My Creator Is Very Lazy." : "You Must To Do That!!"}

          </TableCaption>
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
                    className="mx-1"
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
                  ) : item.text === "LeafNatsu"? (
                    <Button onClick={lazybutton}>{item.text}</Button>
                  ) : (item.text)}
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  {editTask === item.id ? (
                    <Button type="submit" onClick={() => seveEdit(item.id)}>save</Button>
                  ) : (
                    <>
                    <Button type="submit" onClick={() => edit(item.id)}>edit</Button>
                    <Button className="mx-1" type="submit" onClick={() => deleteTask(item.id)}>delete</Button>
                    </>
                  )}
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

