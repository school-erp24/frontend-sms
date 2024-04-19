import React from "react";
import { Pie } from "react-chartjs-2";

const TotalStudentDougnut = () => {
  const data = {
    datasets: [
      {
        data: [24, 61, 51],
        borderWidth: 0,
        backgroundColor: ["#8d95ff", "#d7daff", "#c7cbff"],
        hoverBackgroundColor: ["#8d9fff", "#fff", "#fff"],
      },
    ],
    labels: ['25%', '60%', '50%'],
  };

  const options = {
    plugins:{
		legend: false,
	},
	responsive: true,
    
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: 100 }}>
      <Pie data={data} height={100} options={options} />
    </div>
  );
};

export default TotalStudentDougnut;