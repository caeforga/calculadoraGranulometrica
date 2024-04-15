"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Login from "./login";
import { useRouter } from "next/navigation";
import { getCookie } from 'cookies-next';


export default function Home() {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = getCookie('loggedIn');
    isLoggedIn === 'true' && setLoggedIn(true);
  }, []);

  return (
    <>
    {!loggedIn ? (
      <Login></Login>
    ) : (
      router.push('/routes')
    )}
    </>
  );
}
