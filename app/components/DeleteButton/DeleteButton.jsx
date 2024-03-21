import { useEffect, useState } from "react";
import React from "react";
import MyStyles from "./DeleteButton.module.css";
import { useRouter } from "next/navigation";

function DeleteButton({ idDelet, funcReturn }) {
  const router = useRouter();

  async function handleClick() {
    console.log("props.idDelet----", idDelet);

    if (!idDelet) {
      alert("ID задачи обязателен.");
      return;
    }

    try {
      let str1 = "?id=" + idDelet;
      const res = await fetch("http://localhost:3000/api/tasks" + str1, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify({ name, body, author, category }),
      });

      // console.log("res---", res);

      if (res.ok) {
        console.log("Задача удалена ", res);
        //вызываем функуцию полученную  через пропс чтобы обновить посты на главной
        funcReturn();
        router.refresh();
        router.push("/"); //explain push
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
