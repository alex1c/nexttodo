"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function EditTaskForm({ id, name, body, author,category }) {
    const [newName, setNewTitle] = useState(name);
    const [newBody, setNewBody] = useState(body);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newCategory, setNewCategory] = useState(category);
 
    const router = useRouter();

    //кнопка закрытия
  const handleClose = function () {
    router.push("/");
    router.refresh();
  };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newBody, newAuthor, newCategory }),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update task");
            }
 
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };
 
    return (
        <>
        <div className="flex justify-between items-center">
            <h1 className="font-bold py-10 text-2xl">Обновить задачу</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newName}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
 
            <input
                onChange={(e) => setNewBody(e.target.value)}
                value={newBody}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
           {/*  <input
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
            <input
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            /> */}
 
            <button className="btn btn-primary w-full max-w-xs">
                Обновить задачу
            </button>
            <button
                type="button"
                className="btn btn-primary w-full max-w-xs"
                onClick={handleClose}
              >
                Отмена
              </button>
        </form>
        </>
    );
}