import React, { useState, useEffect } from "react";

function TasksList(props) {
  const [category, setCategory] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setCategory(props.category);
    handleSubmit();
  }, []);

  //эта поебень не работала просто так. В консоли промис боди дата, а выводить не выводило. Через эту прокладку функцию выдало
  async function FackingPromice(hren) {
    console.log(hren);
    setTaskList(hren);
  }

  const handleSubmit = async () => {
    console.log("🚀 ~ file: TasksList.jsx:7 ~ TasksList ~ taskList:", taskList);

    try {
      console.log("props.category---", props.category);
      let str1 = "http://localhost:3000/api/tasks?cat=";
      let str2 = props.category;
      //почесму эта сука не работала нормальным сложением строк?тТолько через костыль? str+str?
      //const res = await fetch(`"http://localhost:3000/api/tasks?cat="${props.category}`, {
      /* const res = await fetch("http://localhost:3000/api/tasks?cat=" ,{ */
      const res = await fetch(str1 + str2, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify({ category }),
      });

      const dat = res.json().then((data) => {
        FackingPromice(data.body);
      });

      return res;

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Задачи не получены ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container mx-auto flex items-stretch">
      
      {taskList.map((item) => (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.body}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
