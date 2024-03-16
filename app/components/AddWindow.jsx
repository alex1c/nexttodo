import React, { Children } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getip from "@/libs/getip";

function AddWindow(props) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter()

  function fakeHandler() {
    return null;
  }

  //хз почему но сразу из юзэффекта не установить было автора. Получался промис несмотря на то что функция получения ип возвращала текст
  async function getip_server() {
    return await getip().then(function (data) {
      setAuthor(data);

      return data;
    });
  }

  useEffect(() => {
    let ip = getip_server();

    setCategory(props.category);
  }, []);

  const handleSubmit = async (e) => {
    //  console.log("e---", e);

    //console.log("🚀 ~ file: AddWindow.jsx:28 ~ useEffect ~ props:", props);

    e.preventDefault();

    if (!name) {
      alert("Заголовок задачи обязателен.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, body, author, category }),
      });

     // console.log("res---", res);

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Задача не создана ");
      }
    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-outline mt-2"
        //onClick={() => document.getElementById("my_modal_1").showModal()}
        onClick={() =>
          document.getElementById("my_modal_" + props.category).showModal()
        }
      >
        Добавить задачу
      </button>
      <dialog id={"my_modal_" + props.category} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Новая задача</h3>
          <p className="py-4">Нажмите ESC либо кнопку закрыть для отмены</p>
          <div className="modal-action ">
            <form
              method="dialog"
              className="size-full "
              onSubmit={handleSubmit}
            >
              {/* if there is a button in form, it will close the modal */}
              <div>
                <input
                  type="text"
                  placeholder="Название задачи"
                  // defaultValue="Название задачи"
                  className="input input-bordered w-full size-full my-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <textarea
                  placeholder="Задача"
                  //defaultValue="Задача"
                  className="textarea textarea-bordered textarea-lg w-full size-full"
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                ></textarea>
              </div>
              <input
                type="hidden"
                name="author"
                value={author}
                onChange={fakeHandler}
              ></input>
              <input
                type="text"
                name="category"
                value={props.category}
                onChange={fakeHandler}
              ></input>

              <div className="flex flex-wrap content-center">
                <button
                  className="btn btn-outline mt-2 mx-2"
                  type="submit"
                   onClick={() =>
                    document
                      .getElementById("my_modal_" + props.category)
                      .close()}
                >
                  Создать
                </button>
                <button
                  className="btn mt-2 mx-2"
                  onClick={() =>
                    document
                      .getElementById("my_modal_" + props.category)
                      .close()
                  }
                >
                  Закрыть
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddWindow;
