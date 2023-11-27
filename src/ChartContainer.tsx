import { lazy } from "react";

const Chart = lazy(() =>
  import("./Chart").then((module) => ({ default: module.Chart }))
);

let parsedCSV: unknown[] | null = null;

async function parseCsv(csvData: string): Promise<unknown[]> {
  const Papa = await import("papaparse");
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
}

function ChartContainer({
  csvData,
  clear,
}: {
  csvData: string;
  clear: () => void;
}) {
  if (parsedCSV !== null) {
    return (
      <div>
        <p>
          <button onClick={clear}>Back</button>
        </p>
        <Chart data={parsedCSV} />
      </div>
    );
  }
  throw parseCsv(csvData).then((data) => {
    parsedCSV = data;
  });
}

export { ChartContainer };
