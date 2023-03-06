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

function WebsiteRevenueChart() {
  const analyticsState = useSelector((state) => state.analyticsReducer);

  const labels = analyticsState.allAnalyticsWeb.map((anlytics) => anlytics._id);

  const data = {
    labels,
    datasets: [
      {
        label: "Percentage cut of Adrevenue",
        data: analyticsState.allAnalyticsWeb.map(
          (anlytics) => anlytics.websiteRevenue
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
            text: "Analysis of each website and its percentage cut of adrevenue in dollars",
          },
        },
      }}
      data={data}
    />
  );
}

export default WebsiteRevenueChart;
