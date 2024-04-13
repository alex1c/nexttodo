'use client';

import React from 'react';
import Task from './Task';
import { useEffect } from 'react';
import checkCookie from '../lib/setcookie';

import Link from 'next/link';
function MainAccordion() {
  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <>
      <div className="collapse bg-base-200 my-2">
        <input type="radio" name="my-accordion-1" defaultChecked />

        <div className="collapse-title text-xl font-extrabold">
          Важно. Срочно. Сделать
        </div>

        {/* Почему то в варианте ссылка внутри кнопки ссылка становилась кликабельной после большой задержки.
 Нужно было несколько раз навести курсор и только после этого становился возможным переход */}
        {/*  <button className="btn btn-outline btn-success ">
              <Link href={'/addTask/1'} >Добавить задачу</Link>
                </button> */}
        <Link href={'/addTask/1'} >
          <button className="btn btn-outline btn-success" test='45'>
            Добавить задачу
          </button>
        </Link>

        <div className="collapse-content flex flex-row flex-wrap">
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
        </div>
      </div>
      <div className="collapse bg-base-200 my-2">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-extrabold">
          Важно. Не срочно. Запланировать
        </div>
        <Link href={'/addTask/2'}>
          <button className="btn btn-outline btn-success">
            Добавить задачу
          </button>
        </Link>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse bg-base-200 my-2">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-extrabold">
          Не важно Срочно. Делегировать
        </div>
        <Link href={'/addTask/3'}>
          <button className="btn btn-outline btn-success">
            Добавить задачу
          </button>
        </Link>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse bg-base-200 my-2">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-extrabold">
          Не важно. Не срочно. Удалить
        </div>
        <Link href={'/addTask/4'}>
          <button className="btn btn-outline btn-success">
            Добавить задачу
          </button>
        </Link>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}

export default MainAccordion;
