import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function DoughnutChart({requests}) {
  
  if (requests.length < 0) {
    return <div>No requests to display</div>;
  }

  const calculatePercentage = (deviceCount, totalRequests) => {
    return ((deviceCount / totalRequests) * 100).toFixed(0);
  };

  
  const devices = requests.map((request) => request.device);

  const deviceCounts = devices.reduce((acc, device) => {
    acc[device] = (acc[device] || 0) + 1;

    return acc;
  }, {});


  const data = {
    labels: Object.keys(deviceCounts),
    datasets: [
      {
        label: "Request",
        data: Object.values(deviceCounts),
        backgroundColor: ["#06B6D4", "#00CACE", "#32DBBC", "#78E9A1"],
        borderWidth: 5,
      },
    ],
  };

  const options = {

    responsive: true,
    cutout: 35,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          textAlign: "center",
          font: {
            size: 8
          }
        },
      },
      title: {
        display: true,
        text: "Device Request",
      },
      datalabels: {
        clamp: true,
        anchor: "end",
        align: "center",
        font: {
          weight: "bold",
        },
        formatter: function(value, context) {
          return   calculatePercentage(value, requests.length) + '%';
        }
      },
    },
  };

  return <Pie data={data} plugins={[ChartDataLabels]} options={options} />;
}

export default DoughnutChart;
