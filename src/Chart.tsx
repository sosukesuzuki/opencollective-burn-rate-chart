import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data }: { data: unknown[] }) {
  const chartData = useMemo(() => {
    // @ts-ignore
    const dates = data.map((item) => item.datetime.split("T")[0]).reverse(); // 日付のみ抽出
    // @ts-ignore
    const balances = data.map((item) => parseFloat(item.balance)).reverse(); // バランスを数値に変換

    return {
      labels: dates,
      datasets: [
        {
          label: "balance",
          data: balances,
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  }, [data]);

  return <Line data={chartData} />;
}

export { Chart };
