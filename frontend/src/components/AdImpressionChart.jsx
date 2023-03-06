import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdImpressionChart() {
  const analyticsState = useSelector((state) => state.analyticsReducer);

  const labels = analyticsState.allAnalyticsUser.map(
    (anlytics) => anlytics.website
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Ad impressions",
        data: analyticsState.allAnalyticsUser.map(
          (anlytics) => anlytics.adImpressions
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
            text: "Analysis of each website with its ad impressions",
          },
        },
      }}
      data={data}
    />
  );
}

export default AdImpressionChart;
