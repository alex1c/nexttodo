"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getip from "../../../libs/getip";
import {useSession} from 'next-auth/react'


export default function AddTask({ params }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")

  const router = useRouter();

  const { id } = params;

  const {data: session} = useSession()

  //хз почему но сразу из юзэффекта не установить было автора. Получался промис несмотря на то что функция получения ип возвращала текст
  async function getip_server() {
    
    return await getip().then(function (data) {
      setAuthor(data);

      return data;
    });
  }



  useEffect(() => {

    //Получим IP  у Амазона
    let ip = getip_server();  
    
    //если залогинен то заполним автора из логина
    if (session || session?.user) {
   //   if (session ) {
      setAuthorName(session.user.name)
      setAuthorEmail(session.user.email)
      //console.log('authorName--',authorName, 'author---', authorEmail,session.user.name);
    }

    setCategory(id);
  }, []);



  //кнопка закрытия
  const handleClose = function () {
    router.push("/");
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Наименование задачи обязательно!");
      return;
    }

    //console.log("debug---",authorEmail,'-----',session?.user.name)

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, body, author, category, authorName, authorEmail }),
      });

      console.log(res);

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex  flex-col items-center">
        <div className="flex flex-col justify-between items-center">
          <h1 className="font-bold py-10 text-2xl">Добавить новую задачу</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="Наименование задачи"
            />

            <input
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="что сделать"
              // defaultValue="/images/1.jpg"
            />
           {/*  <input
              hidden="true"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="author"
              // defaultValue="1"
            />
            <input
              hidden="true"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="input input-bordered input-accent w-full max-w-xs"
              type="text"
              placeholder="Task Category"
            /> */}
            <div className="flex flex-row ">
              <button
                type="submit"
                className="btn btn-primary w-full max-w-xs mx-3"
              >
                Добавить задачу
              </button>
              <button
                type="button"
                className="btn btn-primary w-full max-w-xs"
                onClick={handleClose}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
