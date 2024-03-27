'use client';
//import React from "react";
import Divider from '../Divider';
//import AddButton from "./AddButton";
import AddWindow from '../AddWindow';
import TasksList from '../TasksList/TasksList';
import MyStyles from './MainAccordion.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getip from '../../../libs/getip';

function MainAccordion() {
  //
  //
  //
  const [category, setCategory] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [author, setAuthor] = useState(""); //ип для параметра запроса
  const [authorName, setAuthorName] = useState(""); //имя для запроса тасков авторизованных пользователей

  const { data: session } = useSession();

  //хз почему но сразу из юзэффекта не установить было автора. Получался промис несмотря на то что функция получения ип возвращала текст
  //получаем ип у Амазона
  async function getip_server() {
    return await getip().then(function (dataAuthor) {
      setAuthor(dataAuthor);
      console.log('author--', author);
      return dataAuthor;
    });
  }

 // getip_server()

  function getAuthor() {
  if (session || session?.user) {
    //setAuthorName(session.user.name)
    const temp = session.user.name
    setAuthorName(temp);
    console.log(
      'authorName1--',
      authorName,
      'author2---',
      author,
      '-----',
      session.user.name
    );
   // return await session.user.name
  }
  console.log("tetet--",session)
  //setAuthorName(session.user.name);
 }
  



  useEffect(() => {
    //setCategory(props.category);
    //Получим IP  у Амазона
    //let ip = getip_server();
    getip_server();
    getAuthor()
    //если залогинен то заполним автора из логина
    /* if (session || session?.user) {
      //setAuthorName(session.user.name)
      setAuthorName(session.user.name);
      console.log(
        'authorName1--',
        authorName,
        'author2---',
        author,
        '-----',
        session.user.name
      );
    } */

    /* console.log(
      'authorName1--',
      authorName,
      'author2---',
      author,
      '-----',
      
    ); */

    //setAuthor(ip);
    //основной фетч обновления задач на странице
    // handleSubmit();
  }, []);

 // setTimeout(getip_server, 5000);

  return (
    <div className="mx-2">
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium bg-lime-200 ">
          Важно. Срочно. Сделать
        </div>

        <div className="collapse-content bg-lime-200 ">
          <div className={MyStyles.BackGround_1}>
            {/*  <div ><AddWindow category="1"></AddWindow></div> */}
            {'787878'+authorName}
            <Link href={'/addTask/1'}>
              <button className="btn btn-primary mb-2">Добавить задачу</button>
            </Link>
            <div>
              <TasksList category="1"></TasksList>
            </div>
          </div>
        </div>
      </div>

      <Divider></Divider>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium bg-green-200">
          Важно. Не срочно. Запланировать
        </div>
        <div className="collapse-content bg-green-200">
          <div>
            {/*  <AddWindow category="2"></AddWindow> */}
            <Link href={'/addTask/2'}>
              <button className="btn btn-primary mb-2">Добавить задачу</button>
            </Link>
          </div>
          <div>
            <TasksList category="2"></TasksList>
          </div>
        </div>
      </div>
      <Divider></Divider>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium bg-teal-200">
          Не важно Срочно. Делегировать
        </div>
        <div className="collapse-content bg-teal-200">
          <div>
            {/*  <AddWindow category="3"></AddWindow> */}
            <Link href={'/addTask/3'}>
              <button className="btn btn-primary mb-2">Добавить задачу</button>
            </Link>
          </div>
          <div>
            <TasksList category="3"></TasksList>
          </div>
        </div>
      </div>
      <Divider></Divider>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium bg-orange-200">
          Не важно. Не срочно. Удалить
        </div>
        <div className="collapse-content bg-orange-200">
          <div>
            {/*  <AddWindow category="4"></AddWindow> */}
            <Link href={'/addTask/4'}>
              <button className="btn btn-primary mb-2">Добавить задачу</button>
            </Link>
          </div>
          <div>
            <TasksList category="4"></TasksList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAccordion;
