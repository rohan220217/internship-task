import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdRevenueChart() {
  const analyticsState = useSelector((state) => state.analyticsReducer);

  const labels = analyticsState.allAnalyticsUser.map(
    (anlytics) => anlytics.website
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Ad Revenu in dollars",
        data: analyticsState.allAnalyticsUser.map(
          (anlytics) => anlytics.adRevenueDollars
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Analysis of each website and its revenue in dollars",
          },
        },
      }}
      data={data}
    />
  );
}

export default AdRevenueChart;
