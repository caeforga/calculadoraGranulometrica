"use client";

import { IItemData, calculateGranulometry } from "@/utils/calculateGranulometry";
import { TypeOfMaterial } from "@/components/typeOfMaterial";
import { Table2Component } from "@/components/table/table2";
import { LineChart } from "@/components/charts/line";
import { TableComponent } from "@/components/table";
import { useEffect, useState, useRef } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { CiVideoOn } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";


export default function Home() {
  
  const [granulometry, setGranulometry] = useState<IItemData[]>([
    { label: '1"', opening: 25.4, retainedWeight: 0 },
    { label: '3/4"', opening: 19, retainedWeight: 0 },
    { label: '1/2"', opening: 12.7, retainedWeight: 0 },
    { label: '3/8"', opening: 9.5, retainedWeight: 0 },
    { label: "N4", opening: 4.75, retainedWeight: 0 },
    { label: "N10", opening: 2, retainedWeight: 0 },
    { label: "N20", opening: 0.85, retainedWeight: 0 },
    { label: "N40", opening: 0.425, retainedWeight: 0 },
    { label: "N60", opening: 0.25, retainedWeight: 0 },
    { label: "N100", opening: 0.15, retainedWeight: 0 },
    { label: "N200", opening: 0.075, retainedWeight: 0 },
    { label: "Fondo", retainedWeight: 0 },
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  const [totalSample, setTotalSample] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [difference, setDifference] = useState(0);
  const [N4RetN200, setN4RetN200] = useState(0);
  const [passN200, setPassN200] = useState(0);
  const [password, setPassword] = useState('');
  const [total, setTotal] = useState(0);
  const [dry, setDry] = useState(0);
  const [D60, setD60] = useState(0);
  const [D30, setD30] = useState(0);
  const [D10, setD10] = useState(0);
  const [CU, setCU] = useState(0);
  const [CC, setCC] = useState(0);
  const [N4, setN4] = useState(0);
  const validPassword = 'Udenar2024';

  const handleChangeData = (data: IItemData[]) => {

    const res = calculateGranulometry(data, totalSample, dry);

    window.localStorage.setItem("DIFFERENCE", JSON.stringify(res.difference));
    window.localStorage.setItem("TOTAL", JSON.stringify(res.total));
    window.localStorage.setItem("DATA", JSON.stringify(res.data));
    
    setDifference(res.difference);
    setGranulometry(res.data);
    setTotal(res.total);
  };

  const handleChangeTotalSample = (value: number) => {
    window.localStorage.setItem("TOTAL_SAMPLE", value.toString());
    setTotalSample(value);
    const res = calculateGranulometry(granulometry, totalSample, dry);
    setGranulometry(res.data);
  };

  const handleChangeDry = (value: number) => {
    window.localStorage.setItem("DRY", value.toString());
    setDry(value);
    const res = calculateGranulometry(granulometry, totalSample, dry);
    setGranulometry(res.data);
  };

  const handleLogin = () => {
    if (password === '') {
      setErrorMessage('Digite la contraseña');
    } else if (password === validPassword) {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setErrorMessage('Contraseña incorrecta');
    }
    setPassword('');
    setTimeout(() => {
      setErrorMessage('');
      inputRef.current?.focus();
    }, 1500);
  };

  const handleChangeD60 = (value: number) => {
    window.localStorage.setItem("D60", value.toString());
    setD60(value);
  };

  const handleChangeD30 = (value: number) => {
    window.localStorage.setItem("D30", value.toString());
    setD30(value);
  };

  const handleChangeD10 = (value: number) => {
    window.localStorage.setItem("D10", value.toString());
    setD10(value);
  };

  useEffect(() => {
    let difference: any = window.localStorage.getItem("DIFFERENCE");
    let ts: any = window.localStorage.getItem("TOTAL_SAMPLE");
    let total: any = window.localStorage.getItem("TOTAL");
    let data: any = window.localStorage.getItem("DATA");
    let D60: any = window.localStorage.getItem("D60");
    let D30: any = window.localStorage.getItem("D30");
    let D10: any = window.localStorage.getItem("D10");
    let d: any = window.localStorage.getItem("DRY");

    if (data) setGranulometry(JSON.parse(data) as IItemData[]);
    if (ts) setTotalSample(parseFloat(ts));
    if (d) setDry(parseFloat(d));
    if (total) setTotal(parseFloat(total));
    if (difference) setDifference(parseFloat(difference));
    if (D60) setD60(parseFloat(D60));
    if (D30) setD30(parseFloat(D30));
    if (D10) setD10(parseFloat(D10));
  }, []);

  useEffect(() => {
    setCU(D10 > 0 ? D60 / D10 : 0);
    setCC(D10 * D60 > 0 ? (D30 * D30) / (D10 * D60) : 0);
  }, [D60, D30, D10]);

  useEffect(() => {
    let N4 = {} as IItemData;
    let N200 = {} as IItemData;

    granulometry.forEach((g) => {
      if (g.label === "N4") N4 = g as IItemData;
      if (g.label === "N200") N200 = g as IItemData;
    });

    setN4(N4.acumulatedRetained || 0);
    setPassN200(N200.pass || 0);
    setN4RetN200(100 - (N4.acumulatedRetained || 0) - (N200.pass || 0));
  }, [granulometry]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    isLoggedIn === 'true' && setLoggedIn(true);
  }, []);

  return (
    <main className="min-h-screen">
      {!loggedIn ? ( // Mostrar formulario de inicio de sesión si el usuario no está autenticado
        <div className="flex items-center justify-center h-screen min-h-screen" style={{ backgroundImage: `url('/facingwp.jpeg')` }}>
          <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center justify-between">
            <img
              src="/logo.png"
              alt="Login Header"
              className="mb-4"
              style={{ width: "150px" }}
              />
            <h2 className="mb-4 text-lg text-gray-600 font-bold">Calculadora Granulométrica</h2>
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
          </div>
        </div>
      ) : ( // Mostrar contenido principal si el usuario está autenticado
        <>
        <div className="px-10 pt-10">
          <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Curva Granulométrica
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              {/* atajos de repositorio y video */}
              <button
                onClick={() => (localStorage.setItem('loggedIn', 'false'), setLoggedIn(false))} // Cerrar sesión
                className="mx-4 py-3 text-orange-500"
                title="Cerrar sesión"
              >
                <i className="text-2xl">
                  <IoMdExit />
                </i>
              </button>
              <button
                onClick={() => (window.open("https://docs.google.com/document/d/19VENFoY4GBgyPMhjsulZuMniYfooczJwlVTrWX2YnvE/edit"))}
                className="mx-4 py-3 text-orange-500"
                title="Plantilla de cálculo"
              >
                <i className="text-2xl">
                  <SiMicrosoftexcel />
                </i>
              </button>
              <button
                onClick={() => (window.open("/otra-pagina2"))}
                className="mx-4 py-3 text-orange-500"
                title="Video de ayuda"
              >
                <i className="text-2xl">
                  <CiVideoOn />
                </i>
              </button>
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://www.udenar.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logo2.png"
                  alt="Udenar Logo"
                  className="dark:invert"
                  width={120}
                  height={100}
                  priority
                />
              </a>
            </div>
          </div>
  
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <TableComponent
                  data={granulometry}
                  onChangeData={handleChangeData}
                  total={total}
                  difference={difference}
                  totalSample={totalSample}
                  onChangeTotalSample={handleChangeTotalSample}
                  dry={dry}
                  onChangeDry={handleChangeDry}
                />
              </div>
              <div className="flex flex-col justify-center">
                <TypeOfMaterial />
                <br />
                <Table2Component
                  D60={D60}
                  onChangeD60={handleChangeD60}
                  D30={D30}
                  onChangeD30={handleChangeD30}
                  D10={D10}
                  onChangeD10={handleChangeD10}
                  CU={CU}
                  CC={CC}
                  N4={N4}
                  N4RetN200={N4RetN200}
                  passN200={passN200}
                />
              </div>
            </div>
            <div>
              <LineChart
                labels={granulometry
                  .filter((g) => g.label !== "Fondo")
                  .map((g) => `${g.opening}`)}
                labelX="Apertura del tamiz, mm"
                labelY="% que pasa"
                datasets={[
                  {
                    label: "Dataset",
                    data: granulometry
                      .filter((g) => g.label !== "Fondo")
                      .map((g) => g.pass) as number[],
                    borderColor: "#1E81C4",
                    backgroundColor: "#C4940B",
                  },
                ]}
              />
            </div>
          </div>
  
          <div className="my-10 text-center">
            Modified by David Maya Yela - 2024
          </div>
        </div>
        </>
      )}
    </main>
  );
}
