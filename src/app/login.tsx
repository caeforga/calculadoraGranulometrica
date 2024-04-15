'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

export default function Login() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const validPassword = 'Udenar2024';

  const handleLogin = () => {
    if (password === '') {
      setErrorMessage('Digite la contraseña');
    } else if (password === validPassword) {
      setLoggedIn(true);
      const expires = new Date();
      expires.setHours(expires.getHours() + 6);
      setCookie('loggedIn', 'true', { expires });
      router.push('/routes');
    } else {
      setErrorMessage('Contraseña incorrecta');
    }
    setPassword('');
    setTimeout(() => {
      setErrorMessage('');
      inputRef.current?.focus();
    }, 1500);
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
          <p className={`text-red-500 mb-2 ${errorMessage ? 'fade-in-out' : 'hidden'}`}>
            {errorMessage}
          </p>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 text-gray-600 rounded-md px-3 py-2 mb-2 w-[300px]"
            placeholder="Contraseña"
            />
          <button
            onClick={handleLogin}
            className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700 transition-colors ml-auto"
            >
            Iniciar sesión
          </button>
          <span className="text-xs text-gray-500 mt-8">
            © 2024 Hecho por Hardy David Maya Yela
          </span>
        </div>
      </div>
    </div>
  );
}