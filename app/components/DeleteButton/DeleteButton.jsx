import React from "react";
import MyStyles from "./DeleteButton.module.css";
import { useRouter } from "next/navigation";

function DeleteButton(props) {

    const router = useRouter();

  async function handleClick() {
    console.log("props.idDelet----", props.idDelet);
   

    if (!props.idDelet) {
      alert("ID задачи обязателен.");
      return;
    }

    try {
        let str1 = "?id="+props.idDelet
      const res = await fetch("http://localhost:3000/api/tasks"+str1, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify({ name, body, author, category }),
      });

      // console.log("res---", res);

      if (res.ok) {
        console.log("Задача удалена ", res);
        router.push("/"); //explain push
        
        router.refresh();
      } else {
        throw new Error("Задача не удалена ");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // }

  return (
    <div className={MyStyles.btnDelete} onClick={handleClick}>
      Удалить
    </div>
  );
}

export default DeleteButton;
