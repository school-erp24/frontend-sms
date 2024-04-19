import React from 'react';
import ReactApexChart from "react-apexcharts";

class SurveyChart extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
		series: [
			 {
				name: "Data",
				data: [66,75, 50, 85,50, 16, 70, 30, 40,29, 44, 30, 60, 40, 46]
			}
		],
		options: {
			chart: {
				type: "bar",
				height: 300,
				stacked: true,
				toolbar: {
					show: false
				},				
				offsetX:0,
			},
			plotOptions: {
				bar: {
					columnWidth: "25%",					
					colors: {
						backgroundBarColors: ['#f1f3f7', '#f1f3f7', '#f1f3f7', '#f1f3f7','#f1f3f7','#f1f3f7','#f1f3f7','#f1f3f7'],						
					},

				},
				distributed: true
			},
			colors:['#1367c8'],
			grid: {
				show: false,
				borderColor:'#fff'
			},
			legend: {
				show: false
			},
			fill: {
			  opacity: 1
			},
			dataLabels: {
				enabled: false,
				colors: ['#000'],
				dropShadow: {
				  enabled: true,
				  top: 1,
				  left: 1,
				  blur: 1,
				  opacity: 1
			  }
			},
			xaxis: {
				categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'M'],
				labels: {
					style: {
					  colors: '#888888',					  
					  fontSize: '12px',
					  fontFamily: 'poppins',
					  fontWeight: 400,
					  cssClass: 'apexcharts-xaxis-label',
					},
				},
				crosshairs: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
			},
			
			yaxis: {				
				labels: {
					style: {
					  colors: '#888888',					  
					  fontSize: '12px',
					  fontFamily: 'poppins',
					  fontWeight: 400,
					  cssClass: 'apexcharts-xaxis-label',
					},
				},
			},
			
			tooltip: {
				x: {
					show: true
				}
			},
			responsive: [{
				breakpoint: 1600,
				options: {
					chart: {
						height:300,
					},
					plotOptions: {
						bar: {
							columnWidth: "35%",
						}
					}
				},
			}]
		},
    };
}

  render() {
    return (
		<div id="chart" className='survay-chart'>
		  <ReactApexChart
			options={this.state.options}
			series={this.state.series}
			type="bar"
			height="300px"
		  />
		 </div> 
    );
  }
}
export default SurveyChart;