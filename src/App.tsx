import { Suspense, useState } from "react";
import { Welcome } from "./Welcome";
import { ChartContainer } from "./ChartContainer";

const fileReader = new FileReader();

function App() {
  const [csvData, setCsvData] = useState<string | null>(null);
  return csvData === null ? (
    <Welcome
      onBrowse={(file) => {
        fileReader.onload = () => {
          setCsvData(fileReader.result as string);
        };
        fileReader.readAsText(file);
      }}
    />
  ) : (
    <Suspense fallback={<p>Loading...</p>}>
      <ChartContainer csvData={csvData} clear={() => setCsvData(null)} />
    </Suspense>
  );
}

export default App;
