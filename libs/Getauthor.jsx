

import React from 'react';
import { useSession } from 'next-auth/react';

async function Getauthor() {
  const { data: session } = useSession();

  async function getAuthorFromSession() {
    if (session || session?.user) {
      return session.user.name;
    }
  }

  async function getAuthor() {
    //const eee = await session.user.name;
    console.log('session----====++++', session);

    const authorName = await getAuthorFromSession();
    return authorName;
  }

  //return <div>getauthor</div>;
  return getAuthor();
}

export default Getauthor;
