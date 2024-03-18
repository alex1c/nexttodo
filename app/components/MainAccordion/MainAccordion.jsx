'use client'
//import React from "react";
import Divider from "../Divider";
//import AddButton from "./AddButton";
import AddWindow from "../AddWindow";
import TasksList from "../TasksList/TasksList";
import MyStyles from './MainAccordion.module.css'

function MainAccordion() {
  return (
    <div className="mx-2">
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium bg-lime-200 ">
        
          Важно. Срочно. Сделать
       
        </div>
        
        <div className="collapse-content bg-lime-200 ">
        <div className={MyStyles.BackGround_1}>
          <div ><AddWindow category="1"></AddWindow></div>
          <div  ><TasksList category="1" ></TasksList></div>
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
        <div><AddWindow category="2"></AddWindow></div>
        <div ><TasksList category="2" ></TasksList></div>
        </div>
      </div>
      <Divider></Divider>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium bg-teal-200">
          Не важно Срочно. Делегировать
        </div>
        <div className="collapse-content bg-teal-200">
        <div><AddWindow category="3"></AddWindow></div>
        <div ><TasksList category="3" ></TasksList></div>
        </div>
      </div>
      <Divider></Divider>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium bg-orange-200">
          Не важно. Не срочно. Удалить
        </div>
        <div className="collapse-content bg-orange-200">
        <div><AddWindow category="4"></AddWindow></div>
        <div ><TasksList category="4" ></TasksList></div>
        </div>
      </div>
    </div>
  );
}

export default MainAccordion;
