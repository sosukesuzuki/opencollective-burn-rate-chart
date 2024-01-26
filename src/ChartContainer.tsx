import styles from "./ChartContainer.module.css";
import { lazy, useState } from "react";

const Chart = lazy(() =>
  import("./Chart").then((module) => ({ default: module.Chart }))
);
const Table = lazy(() =>
  import("./Table").then((module) => ({ default: module.Table }))
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

type View = "table" | "chart";
function ChartContainer({
  csvData,
  clear,
}: {
  csvData: string;
  clear: () => void;
}) {
  const [view, setView] = useState<View>("table");
  if (parsedCSV !== null) {
    return (
      <div>
        <button className={styles.backButton} onClick={clear}>
          Back
        </button>
        <button
          className={styles.viewButton}
          onClick={() => setView("table")}
          disabled={view === "table"}
        >
          Table
        </button>
        <button
          className={styles.viewButton}
          onClick={() => setView("chart")}
          disabled={view === "chart"}
        >
          Chart
        </button>
        {view === "table" ? <Table data={parsedCSV} /> : null}
        {view === "chart" ? <Chart data={parsedCSV} /> : null}
      </div>
    );
  }
  throw parseCsv(csvData).then((data) => {
    parsedCSV = data;
  });
}

export { ChartContainer };
