import React from 'react';

let Footer=()=>{
    return(
        <React.Fragment>            
            <footer >
                <div className="pt-2 bg-dark text-white text-center">                
                    <p className="my-1 lead text-danger container">
                        <span className="text-warning">Front-end dependencies</span> : axios, bootstrap, js-cookies, mdbootstrap,
                            react-router-dom, react-redux, redux.
                        
                    </p>
                    <p className="my-1 lead text-danger container">
                        <span className="text-warning">Back-end dependencies</span> : bcrypt, cors, dotenv, express, 
                            jsonwebtoken, mongoose, uuid.
                        
                    </p>
                    <div className="mt-3">My Contacts : 
                        <a className="btn btn-sm btn-dark btn-floating m-1" href="https://www.facebook.com/icazy4you/"><i className="fab fa-facebook-f"></i></a>      
                        <a className="btn btn-sm btn-dark btn-floating m-1" href="mailto: aman990011@gmail.com"><i className="fab fa-google"></i></a>      
                        <a className="btn btn-sm btn-dark btn-floating m-1" href="https://www.instagram.com/icrazy4you/"><i className="fab fa-instagram"></i></a>      
                        <a className="btn btn-sm btn-dark btn-floating m-1" href="https://www.linkedin.com/in/aman-verma-b377ab1ba/"><i className="fab fa-linkedin-in"></i></a>     
                        <a className="btn btn-sm btn-dark btn-floating m-1" href="https://github.com/amannimcet2019"><i className="fab fa-github"></i></a>                    
                    </div>
                    <div className="pb-3">Copyright © 2021 Aman Inc. All rights reserved. </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;            