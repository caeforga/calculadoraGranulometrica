"use client";

import { IItemData } from "@/utils/calculateGranulometry";

interface TableProps {
  data?: IItemData[];
  onChangeData?: (data: IItemData[]) => void;
  total?: number;
  difference?: number;
  totalSample?: number;
  onChangeTotalSample?: (value: number) => void;
  dry?: number;
  onChangeDry?: (value: number) => void;
}

export const TableComponent = ({
  data = [],
  onChangeData,
  total,
  difference,
  totalSample,
  onChangeTotalSample,
  dry,
  onChangeDry,
}: TableProps) => {
  const handleChangeData = (i: number, value: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[i].retainedWeight = value;

    if (onChangeData) onChangeData(newData);
  };

  return (
    <table className="table-fixed hover:table-fixed border-collapse border border-slate-400 w-full">
      <thead>
        <tr className="border border-slate-300">
          <td className="border border-slate-300 text-right px-2" colSpan={6}>
            Peso total muestra seca, gr
          </td>
          <td className="border border-slate-300 text-center">
            <input
              type="number"
              min={0}
              className="w-full px-2 text-center"
              value={totalSample}
              onChange={(e) =>
                onChangeTotalSample &&
                onChangeTotalSample(parseFloat(e.target.value))
              }
            />
          </td>
        </tr>
        <tr className="border border-slate-300">
          <td className="border border-slate-300 text-right px-2" colSpan={6}>
            Peso seco luego de lavado por tamiz 200, gr
          </td>
          <td className="border border-slate-300 text-center">
            <input
              type="number"
              min={0}
              className="w-full px-2 text-center"
              value={dry}
              onChange={(e) =>
                onChangeDry && onChangeDry(parseFloat(e.target.value))
              }
            />
          </td>
        </tr>
        <tr className="border border-slate-300">
          <td className="border border-slate-300 text-right px-2" colSpan={6}>
            Pasa Tamiz durante lavado
          </td>
          <td className="border border-slate-300 text-center px-2">
            <input
              type="number"
              min={0}
              className="w-full px-2 text-center"
              disabled
              value={((totalSample || 0) - (dry || 0)).toFixed(2)}
            />
          </td>
        </tr>
        <tr className="border border-slate-300">
          <th className="border border-slate-300 text-center px-2">Tamiz</th>
          <th className="border border-slate-300 text-center px-2">
            Apertura (mm)
          </th>
          <th className="border border-slate-300 text-center px-2">
            Peso retenido (gr)
          </th>
          <th className="border border-slate-300 text-center px-2">
            Peso corregido (gr)
          </th>
          <th className="border border-slate-300 text-center px-2">
            % retenido
          </th>
          <th className="border border-slate-300 text-center px-2">
            % retenido acumulado
          </th>
          <th className="border border-slate-300 text-center px-2">% pasa</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={`GRA-${i}`} className="border border-slate-300">
            <td className="border border-slate-300 text-center px-2">
              {item.label}
            </td>
            <td className="border border-slate-300 text-center px-2">
              {item.opening}
            </td>
            <td className="border border-slate-300 text-center">
              <input
                type="number"
                className="w-full text-center"
                value={item.retainedWeight}
                min={0}
                onChange={(e) =>
                  handleChangeData(i, parseFloat(e.target.value))
                }
              />
            </td>
            <td className="border border-slate-300 text-center">
              {(item.correctedWeight || 0).toFixed(2)}
            </td>
            <td className="border border-slate-300 text-center">
              {(item.retained || 0).toFixed(2)}
            </td>
            <td className="border border-slate-300 text-center">
              {(item.acumulatedRetained || 0).toFixed(2)}
            </td>
            <td className="border border-slate-300 text-center">
              {(item.pass || 0).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="text-right px-2">
            Total
          </td>
          <td className="border border-slate-300 text-center">
            {total?.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="text-right px-2">
            Diferencia
          </td>
          <td className="border border-slate-300 text-center">
            {difference?.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
