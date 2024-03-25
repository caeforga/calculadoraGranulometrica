import { useEffect } from "react";

interface TypeOfMaterialProps {
  CU?: number;
  CC?: number;
  N4?: number;
  N4RetN200?: number;
  passN200?: number;
}

export const TypeOfMaterial = ({
  CU,
  CC,
  N4,
  N4RetN200,
  passN200,
}: TypeOfMaterialProps) => {
  useEffect(() => {}, [CU, CC, N4, N4RetN200, passN200]);

  return (
    <>
      <p className="text-2xl text-center">El material es:</p>
      <p className="text-lg text-[#C4940B] text-center">No Determinado</p>
    </>
  );
};
