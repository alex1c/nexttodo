import React, { useState, useEffect } from 'react';

import DeleteButton from './DeleteButton';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
//import getuser from '../lib/GetAuthor';
//import { signOut, auth, signIn } from '../auth';

import hasCookie from '../lib/setcookie';

//на входе категория
//проверяем есть ли кука и имя авторизованноно пользователя
//если есть то добавляем в параметры запроса задач
function TasksList(props) {
  //
  //const session = await auth();

  const [taskList, setTaskList] = useState([]);
  const [author, setAuthor] = useState(''); //ип для параметра запроса
  const [authorName, setAuthorName] = useState(''); //имя для запроса тасков авторизованных пользователей
  const [authorCookie, setAuthorCookie] = useState('');

  const [isLoading, setLoading] = useState(true);
  //const [isLoadingSession, setLoadingSession] = useState(true);

  const router = useRouter();

  const { data: session } = useSession();

  //console.log(useSession());
  //console.log('author-------', getuser());
  let author_variable = ''
  let cookie_variable = ''

  async function getAuthorFromSession() {
    if (session || session?.user) {
      //console.log('session.user-- ', session?.user);
      //temp = session?.user;
      return session.user.name;
      //} else {
      //  return '?????';
    }
  }

  async function mainFunction() {
    /* const au = await getAuthorFromSession().then((dat)=>{fuckingPromise2(dat); console.log('dat',dat)}).then(() => {
      setLoadingSession(false);
      //console.log('d-',d)
    })  */
    //console.log('au',au)

    const cc = await hasCookie()
      .then((data) => {
        setAuthorCookie(data.value);
        setAuthor(data.value);
        console.log('data.value', data.value);
        cookie_variable = data.value
      })
      .then(() => getAuthorFromSession())
      .then((auth) => {
        fuckingPromise2(auth);
        console.log('auth---', auth);

        //setAuthorName(auth);
      })

      .then(() => {
        handleSubmit();
        console.log('coc-', authorCookie);
      })
      .then(() => {
        setLoading(false);
      });
  }

  //при обновлении страницы получаем категории и запускаем фетч
  useEffect(() => {
    //по порядку получим куку, автора и потом задачи по ним фетчем

    mainFunction();

    //основной фетч обновления задач на странице
  }, [session]);

  //эта поебень не работала просто так. В консоли промис боди дата, а выводить не выводило. Через эту прокладку функцию выдало
  //как оказалось ниже можно было выкинуть нахрен стейты и просто установить в промисе переменную
  async function FackingPromice(hren) {
    console.log('hren--',hren)
    setTaskList(hren);
  }


  //почему в юзеффекте через промисы автор не устанавливался в стейт?
  //прищлось писать прокладку, но и в ней на входе точно приходила переменная с автором. Тут же устанавливал ее в стейт, но стейт был undefined !!
  //просто присвоил ее переменной наверху здесь даю ей автора и использую ее далее для запроса и все работает!
  //нахуя тогда все эти стейты?
  async function fuckingPromise2(hren2) {
    console.log('hren2-', hren2);
    setAuthorName(hren2);//какого хуя он undefined  если в переменной hren2  автор?
    author_variable=hren2// вот это почему то работает как часы
    return true;
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
      if (author_variable) {
        str3 = '&authorName=' + author_variable;
        console.log('authorName str3--', author_variable);
      }

      //если не авториизован то ищем по ИП
      let str4 = '';
      if (cookie_variable) {
        str4 = '&author=' + cookie_variable;
        //console.log('authorstr4--', str4);
      }
      //
      //

      console.log('fool string----', str1, str2, str3, str4);
      //почему эта сука не работала нормальным сложением строк? Только через костыль? str+str?
      //const res = await fetch(`"http://localhost:3000/api/tasks?cat="${props.category}`, {
      /* const res = await fetch("http://localhost:3000/api/tasks?cat=" ,{ */
      const res = await fetch(str1 + str2 + str3 + str4, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        cache: 'no-store',

        // body: JSON.stringify({ category }),
      });

      const dat = res.json().then((data) => {
        FackingPromice(data.body);
      });

      if (res.ok) {
        //внезапно это сначала работало, а потом оказалось, что должно работать только на сервере. Как так?
        //router.refresh();
        //router.push("/");
    //router.refresh();
    //location.reload();

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

  //if (isLoadingSession || isLoading) return <p>Loading isLoadingSession...</p>;
  if (isLoading) return <p>Loading...</p>;
  //if (!authorCookie) return <p>No profile data</p>;


   return (
    <div className={''}>
      {taskList.map((item) => (
        <div key={item._id} className={''}>
          <div className="card-body ">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.body}</p>
            <div className="card-actions justify-between">
              <Link href={`/editTask/${item._id}`}>
                <button className={''}>Редактировать</button>
              </Link>

               <DeleteButton
                idDelet={item._id}
                funcReturn={returnMessage}
              ></DeleteButton> 
            </div>
          </div>
        </div>
      ))}
    </div>
  ); 
}

export default TasksList;
