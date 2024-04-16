'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import getip from "../../../libs/getip";
import { useSession } from 'next-auth/react';
import hasCookie from '../../../lib/setcookie';

export default function AddTask({ params }) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  //const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorCookie, setAuthorCookie] = useState('');

  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  const { cat } = params;
  const category = cat;

  const { data: session } = useSession();

  console.log('cat--', cat);

  /* async function newFunction(coc) {
    //console.log(coc);
    setAuthorCookie(coc);
    setAuthor(coc);
    return coc;
  } */


  //правильное решение с лоадингом которое раньше не получалось сделать
  //запомнить на бужущее!!
  async function cc() {
    // const cc = await hasCookie().then((data) => newFunction(data.value));
    const cc = await hasCookie().then((data) => {
      setAuthorCookie(data.value);
      setAuthor(data.value);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (session || session?.user) {
      if (!authorName) {
        setAuthorName(session.user.name);
      }

      if (!authorEmail) {
        setAuthorEmail(session.user.email);
      }
    }

    /* if (!cat) {
      setCategory(cat);
    } */

    cc();
  }, []);

  console.log(
    'authorName-',
    authorName,
    'authorEmail-',
    authorEmail,
    'authorCookie',
    authorCookie
  );

  // FunctionInsideuseEfect();

  //кнопка закрытия
  const handleClose = function () {
    router.push('/');
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Наименование задачи обязательно!');
      return;
    }

    //console.log("debug---",authorEmail,'-----',session?.user.name)

    try {
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          body,
          author,
          category,
          authorName,
          authorEmail,
          authorCookie,
        }),
      });

      console.log(res);

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Failed to create a task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!authorCookie) return <p>No profile data</p>;

  return (
    <>
      
        
          <h1 className="font-bold py-10 text-2xl">Добавить новую задачу</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input input-bordered input-accent w-full max-w-md"
              type="text"
              placeholder="Наименование задачи"
            />

            <textarea
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="textarea textarea-bordered textarea-lg w-full max-w-lg"
              type="text"
              placeholder="что сделать"
              rows={20}
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
            
              <button
                type="submit"
                className="btn btn-primary w-full max-w-xs"
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
            
          </form>
       
      
    </>
  );
}
