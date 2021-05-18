import React, { useEffect, useState } from 'react';
import { Container, Figure, Jumbotron } from 'react-bootstrap';
import img from '../../assets/temp.png';
import Axios from 'axios';

const Home=()=>{
    const [count,setCount]=useState(0);
    useEffect(()=>fun())
    const fun=async()=>{
        const res = await Axios.get('http://localhost:5000/usercount');
        setCount(res.data.count)
    }
    return(
        <React.Fragment>
            <div id="back_img">
                <div className="d-flex flex-column justify-content-center align-items-center text-white back_height">
                    <h1>WELCOME</h1>                    
                    <h5 className="mx-5 text-center">Experience Now A Brand New Shopping Mall On Your Fingertips</h5>
                </div>
            </div>            
            <Jumbotron fluid className="mb-0">
                <Container>
                    <h1>Hi.</h1>
                    <p className="lead"> I am Aman, a Final Year Student, pursuing Master of Computer
                        Applications from National Institute of Technology, Trichy.
                        I have created this website with the help of ReactJS and Redux for front-end,
                        ExpressJS for server, NodeJS for back-end, and MongoDB Atlas
                        for database.
                    </p>
                    
                    <p className="text-danger"> 
                        Please help me to test my project.<span className="text-success"> kindly register 
                        yourself and buy some products with fake money and let me know if there are any bugs.
                        </span>
                    </p>
                    
                </Container>
            </Jumbotron>            
            <div className="container-fluid bg-info d-none d-lg-block">
                <div className="d-flex">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h1 >Current Users of the Website</h1>
                        <h3>Live Count : <span className="text-light">{count}</span></h3>
                    </div>
                    <div className="card-body text-right ">
                    <Figure>
                        <Figure.Image
                            width={400}                            
                            alt="image"
                            src={img}
                        />
                    </Figure>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-info d-lg-none">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h1 >Current Users</h1>
                    <h3>Live Count : <span className="text-light">{count}</span></h3>
                </div>                
            </div>       
            <Jumbotron fluid className="mb-0">
                <Container>
                    <h1>Features</h1>
                    <div className="row">
                        <div className="col-md-5 pl-4 pr-2">
                            <h3 >For User</h3>
                            <ol>                         
                                <li>Smart search option, Sort-By option, Products filter option</li>
                                <li>Shopping history.</li>
                                <li>User's password is secured by bcrypt password hashing function .</li>
                                <li>Compatible with every browser.</li>
                                <li>Independent with screen size, can be used by mobile, tabs, laptops, etc.</li>
                                <li>Concurrent login, logout from one device will not affect another.</li>                                
                            </ol>
                        </div>
                        <div className="col-md-5 pl-4 pr-2">
                            <h3 >For Admin</h3>
                            <ol>                         
                                <li>Admin can perform all CRUD operations on products, i.e create, read, update and delete.</li>
                                <li>Can filter Products by category.</li>
                                <li>Admin can add or delete catagory of products.</li>
                                <li>Can see all transactions history.</li>
                                <li>Concurrent login.</li>
                            </ol>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
        </React.Fragment>
    )
}

export default Home;