import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

function DeleteButton({ idDelet, funcReturn }) {
  const router = useRouter();

  async function handleClick() {
    console.log('props.idDelet----', idDelet);

    if (!idDelet) {
      alert('ID задачи обязателен.');
      return;
    }

    try {
      let str1 = '?id=' + idDelet;
      const res = await fetch('http://localhost:3000/api/tasks' + str1, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        // body: JSON.stringify({ name, body, author, category }),
      });

      // console.log("res---", res);

      if (res.ok) {
        console.log('Задача удалена ', res);
        //вызываем функуцию полученную  через пропс чтобы обновить посты на главной
        funcReturn();
        router.refresh();
        router.push('/'); //explain push
      } else {
        throw new Error('Задача не удалена ');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // }

  return (
    <Link href={''} className={'text-rose-700 text-3xl hover:text-orange-500'} onClick={handleClick}>
      <FaTrashAlt/>
    </Link>
  );
}

export default DeleteButton;
