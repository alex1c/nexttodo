'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTaskForm({
  id,
  name,
  body,
  author,
  category,
  authorCookie,
}) {
  const [newName, setNewTitle] = useState(name);
  const [newBody, setNewBody] = useState(body);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newCategory, setNewCategory] = useState(category);
  const [newauthorCookie, setNewauthorCookie] = useState(authorCookie); //не использую в обновлении

  const router = useRouter();

  //кнопка закрытия
  const handleClose = function () {
    router.push('/');
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newName, newBody, newAuthor, newCategory }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onOptionChange = e => {
    setNewCategory(e.target.value)
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="font-bold py-10 text-2xl">Обновить задачу</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newName}
          className="input input-bordered input-accent w-full max-w-md"
          type="text"
        />
        <div className="flex flex-row justify-center items-center">
          {' '}
          <div className="mx-3">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Важная, срочная</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  value={'1'}
                  checked
                  onChange={onOptionChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Важная, не срочная</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                   value={'2'}
                  checked
                  onChange={onOptionChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Не важная,срочная</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-lime-500"
                  value={'3'}
                  checked
                  onChange={onOptionChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Не важная, не срочная</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-amber-500"
                  value={'4'}
                  checked
                  onChange={onOptionChange}
                />
              </label>
            </div>
          </div>
          <textarea
            onChange={(e) => setNewBody(e.target.value)}
            value={newBody}
            className="textarea textarea-bordered textarea-lg w-full max-w-lg"
            type="text"
            rows={15}
          />
        </div>

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

        <button className="btn btn-primary w-full max-w-md">
          Обновить задачу
        </button>
        <button
          type="button"
          className="btn btn-primary w-full max-w-md"
          onClick={handleClose}
        >
          Отмена
        </button>
      </form>
    </>
  );
}
