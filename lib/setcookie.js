'use server';

import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

async function create(data) {
    const oneYear = 24 * 60 * 60 * 1000*365
  cookies().set('matrix', nanoid(), { expires: Date.now() + oneYear });
}

export default async function checkCookie() {
  const cookieStore = cookies();
  //const hasCookie = cookieStore.has('matrix');
  const hasCookie = cookieStore.get('matrix')
  
  if (!hasCookie) {
    const cook = await create();
    return cookieStore.get('matrix')
  }
//console.log('hasCookie--',hasCookie)
  return hasCookie
}



