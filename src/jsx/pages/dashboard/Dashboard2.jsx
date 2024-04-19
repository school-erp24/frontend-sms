import React from 'react';
import { Col, Dropdown, Row, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { 
	SparklinesLine,Sparklines
} 
from "react-sparklines";

import { ProgressCard } from '../../elements/CardDesign';
import { IMAGES } from '../../constant/theme';
import IncomeExpense from '../../elements/dashboard/IncomeExpense';

const CarddBlog = [
    {title:"Total Students", number:'3180', percent:'80%', color:"primary"},
    {title:"New Students", number:'360',  percent:'50%', color:"danger"},
    {title:"Total Course", number:'28',  percent:'76%', color:"red"},
    {title:"Fees Collection", number:'21290$',  percent:'35%', color:"success"},
];

const mediaBlog = [
    { name:'Theodore Handle', image: IMAGES.education1, subject:'B.Com', status:'Available'},
    { name:'Bess Willis', image: IMAGES.education2, subject:'M.Com', status:'Not Available'},
    { name:'James Jones', image: IMAGES.education3, subject:'M.Tach', status:'Available'},
    { name:'Smith Watson', image: IMAGES.education4, subject:'B.Tach', status:'Not Available'},
    { name:'Morese Sharpe', image: IMAGES.education5, subject:'B.A, M.A', status:'Available'},
];

const studentTable = [
    {id:1, isChecked:false,name:'Angelica Ramos', coach:'Ashton Cox', date:'12 Jan 2024', time:'10:15'},
    {id:2, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'11 Jan 2024', time:'10:30'},
    {id:3, isChecked:false,name:'Cedric Kelly', coach:'Brielle Williamson', date:'10 Jan 2024', time:'09:45'},
    {id:4, isChecked:false,name:'Caesar Vance', coach:'Herrod Chandler', date:'08 Jan 2024', time:'10:20'},
    {id:5, isChecked:false,name:'Rhona Davidson', coach:'Sonya Frost', date:'09 Jan 2024', time:'09:30'},
    {id:6, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'15 Jan 2024', time:'09:50'},
];

const salaryTable = [
    { image: IMAGES.education2, name:"Angelica Ramos", color:'success', status:'Paid', date:'12 Jan 2024', amount:'100', transId:'42317'},
    { image: IMAGES.education1, name:"Cedric Kelly", color:'danger',status:'Unpaid', date:'07 Jan 2024', amount:'200', transId:'13369'},
    { image: IMAGES.education4, name:"Bradley Greer",color:'warning', status:'Pending', date:'08 Jan 2024', amount:'150', transId:'25413'},
    { image: IMAGES.education3, name:"Rhona Davidson",color:'danger', status:'Unpaid', date:'02 Jan 2024', amount:'250', transId:'74125'},
    { image: IMAGES.education5, name:"Caesar Vance", color:'success', status:'Paid', date:'10 Jan 2024', amount:'300', transId:'23654'},
];

const ChartDetail = (props) =>{
    return(
        <div className="row mt-2">
            <div className="col">
                <h6 className="font-weight-normal">{props.title}</h6>
                <strong>{props.all}</strong>
            </div>
            <div className="col">
                <h6 className="font-weight-normal">Montly</h6>
                <strong>{props.monthly}</strong>
            </div>
            <div className="col">
                <h6 className="font-weight-normal">Day</h6>
                <strong>{props.day}</strong>
            </div>
        </div>
    )
}

const Dashboard2 = () => {
    const chackboxFun = (type) => {
        setTimeout(()=>{               
           const chackbox = document.querySelectorAll(".customer_shop_single input");
           const motherChackBox = document.querySelector(".customer_shop input");
           for (let i = 0; i < chackbox.length; i++) {
              const element = chackbox[i];
              if (type === "all") {
                 if (motherChackBox.checked) {
                    element.checked = true;
                 } else {
                    element.checked = false;
                 }
              } else {
                 if (!element.checked) {
                    motherChackBox.checked = false;
                    break;
                 } else {
                    motherChackBox.checked = true;
                 }
              }
           }
        },100)
    };
    return (
        <>
            <Row>
                <Col xl={"6"} xxl={"6"} sm={"12"} >
                    <Row>
                        {CarddBlog.map((item, index)=>(
                            <Col xl={"6"} xxl={"6"} sm={"6"} key={index}>
                                <div className="widget-stat card">                                
                                    <ProgressCard title={item.title} number={item.number} percent={item.percent} color={item.color}/>
                                </div>
                            </Col>
                        ))}
                    </Row>   
                </Col>   
                <Col xl={"6"} xxl={"6"} sm={"12"}>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Income/Expense Report</h3>
                        </div>
                        <div className="card-body">                            
                            <IncomeExpense />
                        </div>
                    </div>
                </Col>
                <Col lg={"4"} md={"12"}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Professors List</h4>
                        </div>
                        <div className="card-body dz-scroll" style={{height: "360px"}}>
                            {mediaBlog.map((item, ind)=>(
                                <div className="media mb-3 align-items-center border-bottom pb-3" key={ind}>
                                    <img className="me-3 rounded-circle" alt="" width="50" src={item.image} />
                                    <div className="media-body">
                                        <h5 className="mb-0 text-pale-sky">{item.name} <small className="text-muted">( {item.subject} )</small></h5>
                                        <small className={`mb-0 text-${item.status === "Available" ? "primary" : "danger"}`}>{item.status}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer border-0 pt-2">
                            <div className="text-center">
                                <Link to={"/all-professors"} className="btn btn-primary">View All</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={"8"} lg={"8"} xxl={"8"} md={"12"}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Student List</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive recentOrderTable text-nowrap">
                                <table className="table verticle-middle table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="customer_shop">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkAll"
                                                         onClick={() => chackboxFun("all")}
                                                    />
                                                </div>
                                            </th>
                                            <th scope="col">Student Name</th>
                                            <th scope="col">Assigned Coach</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentTable.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td className="customer_shop_single">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id={`checkbox${ind+21}`}    
                                                            onClick={() => chackboxFun()}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.coach}</td>
                                                <td>{item.date}</td>
                                                <td>{item.time}</td>
                                                <td>
                                                    <Dropdown className="custom-dropdown mb-0">
                                                        <Dropdown.Toggle as="div" className='i-false'>
                                                            <i className="fa fa-ellipsis-v" /> 
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="end" className="dropdown-menu-right">
                                                            <Dropdown.Item>Accept</Dropdown.Item>
                                                            <Dropdown.Item>Details</Dropdown.Item>
                                                            <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>    
                            </div>    
                        </div>    
                    </div>    
                </Col>  
                <Col lg={"4"} md={"12"}>
                    <div className="card">
                        <div className="card-header">    
                            <h4 className="card-title">Gold medal</h4>
                            <small className="text-success"><i className="fa fa-caret-up" /> 20% High then last mont</small>
                        </div>
                        <div className="card-body pb-0">
                            <ChartDetail title="Overall Growth" all="82.24%" monthly="22.25 %" day="28.24%" />
                        </div>
                        <div className="chart-wrapper">                            
                            <Sparklines data={[6,5,8,4,8,6,4,4,6,5,9,5,8,3,4,8,9,8,5,7]}>                                    
                                <SparklinesLine  style={{ fill: "#a2bad3", fillOpacity: ".3" }}/>
                            </Sparklines>                            
                        </div>
                    </div>                                    
                </Col>

                <Col xl={"4"} lg={"4"} xxl={"4"} md={"6"}>
                    <div className="card">
                        <div className="card-header">    
                            <h4 className="card-title">Silver medal</h4>
                            <small className="text-success"><i className="fa fa-caret-up" /> 20% High then last mont</small>
                        </div>
                        <div className="card-body pb-0">
                            <ChartDetail title="Overall Growth" all="52.75%" monthly="12.24 %" day="20.25%"/>
                        </div>
                        <div className="chart-wrapper">                            
                            <Sparklines data={[9,3,7,8,6,7,3,3,7,4,6,8,3,4,7,3,4,7,8,5]}>
                                <SparklinesLine color="#ff9e4e" style={{ fill: "#ff9e4e", fillOpacity: ".3" }} />
                            </Sparklines>
                        </div>
                    </div>
                </Col>
                <Col xl={"4"} lg={"4"} xxl={"4"} md={"6"}>
                    <div className="card">
                        <div className="card-header">    
                            <h4 className="card-title">Bronze medal</h4>
                            <small className="text-success"><i className="fa fa-caret-up" /> 20% High then last mont</small>
                        </div>
                        <div className="card-body pb-0">
                            <ChartDetail title="Overall Growth" all="70.50%" monthly="15.60 %" day="30.15%"/>
                        </div>
                        <div className="chart-wrapper">                            
                            <Sparklines  className="peity-line-3"  data={[3,8,3,7,8,6,3,4,7,3,7,9,6,3,7,6,7,3,4,2]}>
                                <SparklinesLine color="#fc7d60" />
                            </Sparklines>
                        </div>
                    </div>
                </Col>
                <Col xl={"12"} lg={"12"} xxl={"12"} md={"12"}>
                    <div className="card profile-tab">
                        <div className="card-header">
                            <h4 className="card-title">Salary Status</h4>
                        </div>
                        <div className="card-body custom-tab-1">
                            <Tab.Container defaultActiveKey="Posts">
                                <Nav as="ul" className="nav-tabs mb-3">
                                    <Nav.Item as="li"><Nav.Link eventKey="Posts" className="pb-2">Professors</Nav.Link></Nav.Item>
                                    <Nav.Item as="li"><Nav.Link eventKey="Library" className="pb-2">Librarian</Nav.Link></Nav.Item>
                                    <Nav.Item as="li"><Nav.Link eventKey="Other" className="pb-2">Other</Nav.Link></Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey={"Posts"}>
                                        <div className="table-responsive">
                                            <table className="table table-responsive-md text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Profile</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Transaction ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salaryTable.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td><img src={item.image} className="rounded-circle" width="35" alt="" /></td>
                                                            <td>{item.name}</td>
                                                            <td><span className={`badge badge-rounded badge-${item.color}`}>{item.status}</span></td>
                                                            <td>{item.date}</td>
                                                            <td>${item.amount}</td>
                                                            <td>#{item.transId}</td>
                                                        </tr>
                                                    ))}                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>                
                                    <Tab.Pane eventKey={"Library"}>
                                        <div className="table-responsive">
                                            <table className="table table-responsive-md text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Profile</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Transaction ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salaryTable.slice(1,3).map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td><img src={item.image} className="rounded-circle" width="35" alt="" /></td>
                                                            <td>{item.name}</td>
                                                            <td><span className={`badge badge-rounded badge-${item.color}`}>{item.status}</span></td>
                                                            <td>{item.date}</td>
                                                            <td>${item.amount}</td>
                                                            <td>#{item.transId}</td>
                                                        </tr>
                                                    ))}                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>                    
                                    <Tab.Pane eventKey={"Other"}>
                                        <div className="table-responsive">
                                            <table className="table table-responsive-md text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Profile</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Transaction ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salaryTable.slice(3,5).map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td><img src={item.image} className="rounded-circle" width="35" alt="" /></td>
                                                            <td>{item.name}</td>
                                                            <td><span className={`badge badge-rounded badge-${item.color}`}>{item.status}</span></td>
                                                            <td>{item.date}</td>
                                                            <td>${item.amount}</td>
                                                            <td>#{item.transId}</td>
                                                        </tr>
                                                    ))}                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Pane>                    
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </Col>
            </Row>   
        </>
    );
};

export default Dashboard2;