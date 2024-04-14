import React, { useState, useEffect } from 'react';
//import {auth} from '../auth'
import { useSession } from 'next-auth/react';


/* const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null) */
async function GetAuthor() {
  const { data: session } = useSession();
 

  if (session || session?.user) {
    console.log('session.user-- ', session?.user);
    //temp = session?.user;
    return session.user.name;
    //} else {
    //  return '?????';
  }
}

export default async function getuser() {

    let r = true

  const user = await GetAuthor().then((au) => {
    setData(au);
    setLoading(false)
  });
 // return user;

 if (!isLoading) return data
 //return data;
}
//console.log('hasCookie--',hasCookie)

//export default user;
