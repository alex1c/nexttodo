"use server";
//import React from 'react'

let realip = ''

async function getIPFromAmazon() {
  return await fetch("https://checkip.amazonaws.com/", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then(function (data) {
      console.log("data ip--", data);
      return data;
    });
}

async function getip() {
  return await  getIPFromAmazon()
}

//console.log("getip", getip());


    


export default  getip
  
