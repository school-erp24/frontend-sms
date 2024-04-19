import React from "react";
import ReactApexChart from "react-apexcharts";

class DonughtChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [30, 20, 12],
			options: {
				chart: {
					type: 'donut',
					height: 300,                    
				},
                labels: ["Mail-Order Sales", "  In-Store Sales", "Download Sales"],
				dataLabels: {
				  enabled: false,
				},
				stroke: {
				  width: 3,
				},

				plotOptions: {
					pie: {
					  donut: {
						labels: {
						  show: true,
						  total: {
							showAlways: true,
							show: true
						  }
						}
					  }
					}
				},
				colors:['#1367c8', '#1367c8', '#1367c8'],

				legend: {
					position: 'bottom',
					show:false
				},
				responsive: [
					// {
					// 	breakpoint: 1800,
					// 	options: {
					// 		chart: {
					// 			height:200
					// 		},
					// 	}
					// },
					{
						breakpoint: 1800,
						options: {
							chart: {
								height:200
							},
						}
					}
				]
			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={300} 
				/>
			</div>
		);
	}
}

export default DonughtChart;