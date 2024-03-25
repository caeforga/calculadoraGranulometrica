"use client";

interface TableProps {
  D60?: number;
  onChangeD60?: (value: number) => void;
  D30?: number;
  onChangeD30?: (value: number) => void;
  D10?: number;
  onChangeD10?: (value: number) => void;
  CU?: number;
  CC?: number;
  N4?: number;
  N4RetN200?: number;
  passN200?: number;
}

export const Table2Component = ({
  D60,
  onChangeD60,
  D30,
  onChangeD30,
  D10,
  onChangeD10,
  CU,
  CC,
  N4,
  N4RetN200,
  passN200,
}: TableProps) => {
  return (
    <>
      <table className="table-fixed hover:table-fixed border-collapse border border-slate-400 w-full">
        <tbody>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-right px-2">D60</td>
            <td className="border border-slate-300 text-center">
              <input
                type="number"
                min={0}
                className="w-full px-2 text-center"
                value={D60}
                onChange={(e) =>
                  onChangeD60 && onChangeD60(parseFloat(e.target.value))
                }
              />
            </td>
            <td className="border border-slate-300 text-left px-2">mm</td>
          </tr>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-right px-2">D30</td>
            <td className="border border-slate-300 text-center">
              <input
                type="number"
                min={0}
                className="w-full px-2 text-center"
                value={D30}
                onChange={(e) =>
                  onChangeD30 && onChangeD30(parseFloat(e.target.value))
                }
              />
            </td>
            <td className="border border-slate-300 text-left px-2">mm</td>
          </tr>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-right px-2">D10</td>
            <td className="border border-slate-300 text-center">
              <input
                type="number"
                min={0}
                className="w-full px-2 text-center"
                value={D10}
                onChange={(e) =>
                  onChangeD10 && onChangeD10(parseFloat(e.target.value))
                }
              />
            </td>
            <td className="border border-slate-300 text-left px-2">mm</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table-fixed hover:table-fixed border-collapse border border-slate-400 w-full">
        <tbody>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">CU</td>
            <td
              className="border border-slate-300 text-center px-2"
              colSpan={2}
            >
              D60/D10
            </td>
            <td className="border border-slate-300 text-center px-2">
              {CU?.toFixed(2)}
            </td>
          </tr>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">CC</td>
            <td
              className="border border-slate-300 text-center px-2"
              colSpan={2}
            >
              D30^2/D10*D60
            </td>
            <td className="border border-slate-300 text-center px-2">
              {CC?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table-fixed hover:table-fixed border-collapse border border-slate-400 w-full">
        <tbody>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">
              % gravas
            </td>
            <td
              className="border border-slate-300 text-center px-2"
              colSpan={2}
            >
              Ret N4
            </td>
            <td className="border border-slate-300 text-center px-2">
              {N4?.toFixed(2)}
            </td>
          </tr>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">
              % arenas
            </td>
            <td
              className="border border-slate-300 text-center px-2"
              colSpan={2}
            >
              Pasa N4 Ret 200
            </td>
            <td className="border border-slate-300 text-center px-2">
              {N4RetN200?.toFixed(2)}
            </td>
          </tr>
          <tr className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">
              % finos
            </td>
            <td
              className="border border-slate-300 text-center px-2"
              colSpan={2}
            >
              Pasa N200
            </td>
            <td className="border border-slate-300 text-center px-2">
              {passN200?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
