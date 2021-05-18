import React from 'react';
import image403 from '../../assets/accessdenied.png';
import { Link } from 'react-router-dom';

const AccessDenied = () =>{
    return(
        <React.Fragment>
            <div className="container my-5">
                <div className="text-center">
                    <img src={image403} alt="403" height="300px"/>                    
                </div>
                <div className="text-center">
                    <h2>Access Denied, You can not access this page.</h2>
                    <Link to='/'><button className="btn btn-primary">Go to home</button></Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AccessDenied;