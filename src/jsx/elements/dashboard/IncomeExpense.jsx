import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class IncomeExpense extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019","2020","2021"],
      datasets: [
        {
          label: "Series A",
          backgroundColor: "rgba(7, 41, 77,1)",
          hoverBackgroundColor: "rgba(7, 41, 77, 1)",
          data: ["100", "70", "75", "70", "50", "75", "79","60","66","46","40"],
          barPercentage: 0.9,
        },
        {
          label: "Series B",
          backgroundColor: "rgba(20, 59, 100, 1)",
          hoverBackgroundColor: "rgba(20, 59, 100, 1)",
          data: ["90", "75", "70", "70", "40", "65", "35","20","30","60","55"],
          barPercentage: 0.9,
        },
        {
          label: "Series C",
          backgroundColor: "#ff8f16",
          hoverBackgroundColor: "#ff8f16",
          data: ["80", "75", "65", "65", "40", "85", "50","60","60","90","60"],
          barPercentage: 0.9,
        },
      ],
    };
    const options = {
      plugins:{
		  legend: {
			  display: false,
		  },
		  title: {
			  display: false,
		  },
		  tooltips: {
			  mode: "index",
			  intersect: false,
		  },
		  responsive: true,
	  },
      scales: {
        x:
          {
            display: true,
            stacked: true,
            ticks:{
              color: "#888888",
            },
            grid: {
                color:'#fff'
            },
          },
        y:
          {
            display: true,
            stacked: true,
           
            ticks:{
              color: "#888888",
            },
          },
      },
    };

    return (
        <div 
            // style={{ height: "150px"}}
        >
        <Bar data={data} 
            height={100} 
            options={options} 
        />
      </div>
    );
  }
}

export default IncomeExpense;
