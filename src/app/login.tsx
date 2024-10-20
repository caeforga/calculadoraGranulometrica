'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

export default function Login() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
      const expires = new Date();
      expires.setHours(expires.getHours() + 6);
      setCookie('loggedIn', 'true', { expires });
      router.push('/routes');
  };

  useEffect(() => {
    const isLoggedIn = getCookie('loggedIn');
    isLoggedIn === 'true' && setLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center h-screen min-h-screen" style={{ backgroundImage: `url('/facingwp.jpeg')` }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center justify-between">
          <img
            src="/logo.png"
            alt="Login Header"
            className="mb-4"
            style={{ width: "150px" }}
            />
          <h2 className="mb-4 text-lg text-gray-600 font-bold">Programa clasificación sucs</h2>
          <button
            onClick={handleLogin}
            className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700 transition-colors ml-auto"
            >
            Comenzar -{'>'}
          </button>
          <span className="text-xs text-gray-500 mt-8">
            © 2024 Hecho por Hardy David Maya Yela
          </span>
        </div>
      </div>
    </div>
  );
}
