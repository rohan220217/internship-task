import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CompanyRevenueChart() {
  const analyticsState = useSelector((state) => state.analyticsReducer);

  const labels = analyticsState.allAnalyticsCompRevenue.map(
    (anlytics) => anlytics._id
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Website cut",
        data: analyticsState.allAnalyticsCompRevenue.map(
          (anlytics) => anlytics.websiteRevenue
        ),

        backgroundColor: [...Array(10).keys()].map(
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
      },
    ],
  };

  return (
    <Pie
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Analysis of each comapny with its ad revnue cut",
          },
        },
      }}
      data={data}
    />
  );
}

export default CompanyRevenueChart;
