import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function UserRevenueChart() {
  const analyticsState = useSelector((state) => state.analyticsReducer);

  const labels = analyticsState.allAnalyticsUserRevenue.map(
    (anlytics) => anlytics._id
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Percentage cut of Website Revenue",
        data: analyticsState.allAnalyticsUserRevenue.map(
          (anlytics) => anlytics.websiteRevenue
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Avg site viewing time",
      //   data: analyticsState.allAnalyticsUser.map(
      //     (anlytics) => anlytics.avgSiteViewingTime
      //   ),
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Analysis of each user with its cut",
          },
        },
      }}
      data={data}
    />
  );
}

export default UserRevenueChart;
