//import { useRouter } from 'next/navigation';
'use server'

import { redirect } from 'next/navigation'

export default async function MovieTaskext(props) {

    //const router = useRouter();

    if (props[0].category !== props[1]) {

      //все старое кроме категории
      const idTask = props[0]._id
      const newName = props[0].name
      const newBody = props[0].body
      const newAuthor = props[0].author
      const newCategory = props[1]

      console.log('idTask--',idTask)


      //fetch из формы редкатрования
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${idTask}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify({ newName, newBody, newAuthor, newCategory }),
        })

        if (!res.ok) {
          throw new Error('Failed to update task');
        }
        redirect('/')
       // router.refresh();
       // router.push('/');
        
      } catch (error) {
        console.log(error);
      }

      
    }
  }
