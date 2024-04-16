import React from 'react';
import { signOut, auth, signIn } from '../auth';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import Link from 'next/link';
//import { useEffect } from 'react';
//import {checkCookie} from '../lib/setcookie';

async function Navbar() {
  const session = await auth();

  //checkCookie();

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost text-xl">Матрица Эйзенхауэра</Link>
        </div>

        <div className="ml-auto">
          <div className="form-control mx-3">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          {/*  {session && session.user ? (<div><p>{session.user.name}</p><form></form><div/>) : (<div>333<div/>)} */}
          {session && session.user ? (
            <div className="flex gap-4 text-green-800 font-extrabold">
              <p className="text-xl ">{session.user.name}</p>
              <div className="w-30 rounded-full">
                <Image
                  alt="user photo"
                  src={session.user.image}
                  width={30}
                  height={30}
                  className="w-30 rounded-full"
                />
              </div>

              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button type="submit" className=" text-green-800 mr-4">
                  Выйти
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn();
              }}
            >
              <button type="submit" className=" text-green-700 mr-4">
                Войти
              </button>
            </form>
          )}
        </div>
        {/* <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://source.unsplash.com/random/200x200?sig=2"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
