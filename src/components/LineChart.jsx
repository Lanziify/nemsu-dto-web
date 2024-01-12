import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { getMonth } from "../utils/timeUtils";

ChartJS.register(
  Tooltip,
  Title,
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function LineChart({ requests }) {
  const requestCountsByMonth = {};

  var dataArray = [4, 6, 10, 14, 13, 20, 10, 12, 8, 12, 10, 9];

  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // useEffect(() => {
  //   const handleResize = () => {
  //     setShowLabels(window.innerWidth >= 428);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  //   const sortedRequest = [...requests].sort((a, b) => {
  //     return a.createdAt._seconds - b.createdAt._seconds;
  //   });

  requests.forEach((request) => {
    const month = getMonth(request.createdAt._seconds);
    if (!requestCountsByMonth[month]) {
      requestCountsByMonth[month] = 1;
    } else {
      requestCountsByMonth[month]++;
    }
  });

  const uniqueMonths = Object.keys(requestCountsByMonth);
  const requestCounts = uniqueMonths.map(
    (month) => requestCountsByMonth[month]
  );

  const data = (canvas) => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: "Request",
          data: dataArray,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 160);
            gradient.addColorStop(0, "#06b6d4");
            gradient.addColorStop(1, "#5eead400");
            return gradient;
          },
          fill: "start",
          tension: 0.3,
          // pointBorderColor: "transparent",
          // pontBorderRadius: 4,
          // pointColor: "white",
          borderColor: "#06b6d4",
        },
      ],
    };
  };

  const options = {
    layout: {
      autoPadding: true,
      padding: 16,
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "Monthly Number of Requests",
      },
      legend: {
        display: false,
      },
      tooltip: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "transparent",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        max: Math.max(...dataArray) + 5,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Line data={data()} options={options} />
    </div>
  );
}

export default LineChart;
