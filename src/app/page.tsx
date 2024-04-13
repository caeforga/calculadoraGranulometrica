"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Login from "./login";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
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
