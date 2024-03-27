"use client";

//это утсановка провайдера сессий чтобы они были доступны везде.
//детали пишем здесь и потом используем в лайоте

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const Providers = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
