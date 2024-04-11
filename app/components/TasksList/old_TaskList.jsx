import React, { useState, useEffect } from 'react';
import MyStyles from './TasksList.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import getip from '../../../libs/getip';


//


function TasksList(props) {
  //
 
  const [taskList, setTaskList] = useState([]);

   const [author, setAuthor] = useState(''); //ип для параметра запроса
  const [authorName, setAuthorName] = useState(''); //имя для запроса тасков авторизованных пользователей

  const router = useRouter();
  //const [authorName, setAuthorName] = useState(''); //имя для запроса тасков авторизованных пользователей
  //
  const { data: session } = useSession();

  async function getAuthorFromSession() {
    if (session || session?.user) {
      return session.user.name;
    }
  }

  async function getAuthor() {
    //const eee = await session.user.name;
    console.log('session----====++++', session);

    const temp2 = await getAuthorFromSession().then((temp) => {
      setAuthorName(temp);
    });
   // console.log('9999-', temp2);

    return temp2;
  }

  //const author =  getip();
 // getAuthor().then((data) => {
  //  console.log('authorName', authorName, data);
 // });
 getAuthor()

  getip().then((dataip) => {setAuthor(dataip)} )

  
  //при обновлении страницы получаем категории и запускаем фетч
  useEffect(() => {
    

    //основной фетч обновления задач на странице
    handleSubmit();
  }, [author,authorName]);

  

  //эта поебень не работала просто так. В консоли промис боди дата, а выводить не выводило. Через эту прокладку функцию выдало
  async function FackingPromice(hren) {
    setTaskList(hren);
  }

  //костыль. после удаления через эту функцию запускаем повторный фетч
  const returnMessage = function () {
    handleSubmit();
  };

  //основной обработчик
  const handleSubmit = async () => {
    try {
      //по категории ищем всегда
      let str1 = 'http://localhost:3000/api/tasks?cat=';
      let str2 = props.category; //props//.category;
      //

      //если авторизован добавляем имя
      let str3 = '';
      if (authorName !== '') {
        str3 = '&authorName=' + authorName;
        console.log('authorName str3--', authorName);
      }
      //console.log('str3--', props.category, authorName, author);

      //если не авториизован то ищем по ИП
      let str4 = '';
      if (author !== '') {
        str4 = '&author=' + author;
        console.log('authorstr4--', str4);
      }
      //
      //

      console.log('string----', str1, str2, str3, str4);
      //почему эта сука не работала нормальным сложением строк? Только через костыль? str+str?
      //const res = await fetch(`"http://localhost:3000/api/tasks?cat="${props.category}`, {
      /* const res = await fetch("http://localhost:3000/api/tasks?cat=" ,{ */
      const res = await fetch(str1 + str2 + str3 + str4, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        cache: 'no-store' 

        // body: JSON.stringify({ category }),
      });

      const dat = res.json().then((data) => {
        FackingPromice(data.body);
      });

      if (res.ok) {
        router.refresh();

        //сначала думал здесь при обновлении перечитаются посты и уберутся удаленные, но нет. Пришлось отдельно дергать функцию через пропс
        return res;
      } else {
        throw new Error('Задачи не получены ');
      }
    } catch (error) {
      console.log(error);
    }
  };

 // handleSubmit();

  return (
    <div className={MyStyles.MainAccordionMainDiv}>
      {taskList.map((item) => (
        <div key={item._id} className={MyStyles.TaskListMainDiv}>
          {/*  <div className="card w-96 bg-base-100 shadow-xl "> */}
          <div className="card-body ">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.body}</p>
            <div className="card-actions justify-between">
              {/*  <button className={MyStyles.btnEdit}>Редактировать</button> */}
              <Link href={`/editTask/${item._id}`}>
                <button className={MyStyles.btnEdit}>Редактировать</button>
              </Link>

              {/* в кнопку передаем в качестве промиса функцию. После успешного удаления дергаем ее и она запускает фетч */}
              <DeleteButton
                idDelet={item._id}
                funcReturn={returnMessage}
              ></DeleteButton>
            </div>
          </div>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
}

export default TasksList;
