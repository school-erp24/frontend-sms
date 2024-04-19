import React from 'react';
import ReactApexChart from 'react-apexcharts';
 
class Apexchart extends React.Component {
	
	constructor(props) {
		super(props);		
		this.state = {
		render: false, //Set render state to false
			series: [{
				name: 'Phone',
				data: [0,31, 90, 30, 150, 25, 10]
			}, {
				name: 'Window',
				data: [0,11, 60, 80, 47, 40, 10]
			},
            {
				name: 'Mac',
				data: [0,11, 25, 35, 17, 120, 40]
			}],
			options: {
			  chart: {
					height: 350,
					type: 'area',
					toolbar:{
						show:false
					}
				
				},
				colors:['#5aa1f2', '#2176d8', '#1565c0'],
				dataLabels: {
				  enabled: false,
				},
				legend: {
					show: false,
					
				},
                              
				xaxis: {	
                    show: false, 
				    categories: ['2011', '2012', '2013', '2014', '2015', '2016','2017'],
				    labels: {                    
						show: false,
                        style: {
                            colors: '#888888',
                            fontSize: '12px',
                            fontFamily: 'Poppins',
                            fontWeight: 100,
                        },
                    },
                    crosshairs: {
                        show: false,
                    },
                  
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                         show: false,
                    },                        
				},
				yaxis: {                    
                    lines: {
                        show: false,
                      },
                    axisBorder: {
                        show: false,
                     },
                     axisTicks: {
                        show: false,
                     },
                     crosshairs: {
                        show: false,
                    },
					labels: {                        
                        style: {
                            colors: '#888888',
                            fontSize: '12px',
                            fontFamily: 'Poppins',
                            fontWeight: 100,
                            // cssClass: 'apexcharts-xaxis-label',
                        },                    
				    },
                    
				},
				fill: {
					type: 'solid',
					opacity: 0.8,
				},
				tooltip: {
				  y: {
					formatter: function (val) {
					  return "$ " + val + " thousands"
					}
				  }
				}
			},
	  
	  
		};
	
	}		
    render() {				
        return (
            <div id="universchart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area"  width="100%" height={300} />
            </div>
        );
    }	
	
}

export default Apexchart;