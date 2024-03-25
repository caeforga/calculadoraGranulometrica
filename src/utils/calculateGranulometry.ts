export interface IItemData {
  label: string;
  opening?: number;
  retainedWeight: number;
  correctedWeight?: number;
  retained?: number;
  acumulatedRetained?: number;
  pass?: number;
}

export interface IResponseGranulometry {
  data: IItemData[];
  total: number;
  difference: number;
}

export const calculateGranulometry = (
  data: IItemData[],
  totalSample: number,
  dry: number
): IResponseGranulometry => {
  const total = data.reduce((p, c) => p + c.retainedWeight, 0);
  const difference = dry - total;
  const newData: IItemData[] = JSON.parse(JSON.stringify(data));

  newData.forEach((item, i) => {
    item.correctedWeight =
      total > 0
        ? item.retainedWeight + (difference * item.retainedWeight) / total
        : 0;
    item.retained =
      (item.label === "Fondo"
        ? (totalSample - dry + item.correctedWeight) / totalSample
        : item.correctedWeight / totalSample) * 100;
    item.acumulatedRetained =
      (newData[i - 1]?.acumulatedRetained || 0) + (item.retained || 0);
    item.pass = 100 - item.acumulatedRetained;
  });

  return { total, difference, data: newData };
};
