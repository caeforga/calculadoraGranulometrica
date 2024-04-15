import Link from 'next/link';
import '@/app/globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function Routes() {

    const router = useRouter();
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        const loggedIn = getCookie('loggedIn');
        if (!loggedIn || loggedIn !== 'true') {
            router.push('/');
        } else if (!played && typeof window !== 'undefined') {
            const audio = new Audio('/intro.mp3');
            audio.play().catch(error => console.log(error));
            setPlayed(true);
        }
    }, [played]);

    return (
        <>
            <div className="min-h-screen">
                <div className="flex items-center justify-center h-screen min-h-screen" style={{ backgroundImage: `url('/labS.jpg')` }}>
                    <div className="w-2/3 bg-white bg-opacity-80 p-8 rounded-lg flex flex-col items-center justify-between">
                        
                        <img className="rounded-full w-36 h-36 mb-8 p-1 ring-2 ring-gray-300 dark:ring-gray-500" src="/labS.jpg" alt="Extra large avatar"/>

                        <h2 className="mb-4 text-lg text-black font-bold flex text-center">Laboratorio de materiales de construcción, suelos y pavimentos</h2>
                        <span className="text-xl text-black mb-4 flex text-center">
                            Programa de ingeniería civil
                        </span>

                        <Link className='w-full' href={'https://youtu.be/iTqGQO-e2ic?si=TsQqFPIS4HGQoVgI'} target="_blank" rel="noopener noreferrer">
                            <button type="button" className="w-full text-xl text-gray-900 bg-white hover:bg-gray-100 rounded-full border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mb-2">
                                <span className="w-10 h-full flex justify-start items-center">👷</span>
                                <span className="flex-grow text-center">Presentación de laboratorios programa ingeniería civil</span>
                                <span className="w-10 h-full flex justify-end items-center">👩‍🔬</span>
                            </button>
                        </Link>

                        <Link className='w-full' href={'/app'}>
                            <button type="button" className="animate-ihtAVo w-full text-xl text-gray-900 bg-white hover:bg-gray-100 rounded-full border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mb-2">
                                <span className="w-10 h-full flex justify-start items-center">🧪</span>
                                <span className="flex-grow text-center">Granulometria de suelos (SUCS)</span>
                                <span className="w-10 h-full flex justify-end items-center">🔬</span>
                            </button>
                        </Link>

                        <Link className='w-full' href="https://drive.google.com/drive/folders/1_hTsUwDnO8tOekGI16V88N-QcUosT59D?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="w-full text-xl text-gray-900 bg-white hover:bg-gray-100 rounded-full border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mb-2">
                                <span className="w-10 h-full flex justify-start items-center">📝</span>
                                <span className="flex-grow text-center">Formatos de Laboratorio</span>
                                <span className="w-10 h-full flex justify-end items-center">📐</span>
                            </button>
                        </Link>

                        <Link className='w-full' href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="w-full text-xl text-gray-900 bg-white hover:bg-gray-100 rounded-full border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mb-2">
                                <span className="w-10 h-full flex justify-start items-center">▶️</span>
                                <span className="flex-grow text-center">Video tutorial</span>
                                <span className="w-10 h-full flex justify-end items-center">🎬</span>
                            </button>
                        </Link>


                    </div>
                </div>
            </div>
        </>
    )
}