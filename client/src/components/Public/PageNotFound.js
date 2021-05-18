import React from 'react';
import image404 from '../../assets/404.png';
import { Link } from 'react-router-dom';

const PageNotFound = () =>{
    return(
        <React.Fragment>
            <div className="container my-5">
                <div className="text-center">
                    <img src={image404} alt="404" height="300px"/>                    
                </div>
                <div className="text-center">                    
                    <Link to='/'><button className="btn btn-primary">Go to home</button></Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PageNotFound;