"use server";
//import React from 'react'

let realip = "";

async function getIPFromAmazon() {
  return await fetch("https://checkip.amazonaws.com/", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then(function (data) {
      //console.log("data ip--", data);
      return data;
    })
    .catch((error) => {
      //возвращать имя компа или что то подобное если не будет работать без впн
      return error;
    });
}

async function getip() {
  const ip = await getIPFromAmazon();
  //console.log(ip);
  return ip;

}

//console.log("getip", getip());

export default getip;
