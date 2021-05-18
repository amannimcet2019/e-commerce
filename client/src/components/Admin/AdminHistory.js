import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

const AdminHistory = () =>{
    const [admin,setAdmin]=useState({})
    const [flag,setFlag]=useState(0)
    const [myError,setMyError]=useState(0)
    useEffect(()=>fun(),[]) 
    const fun=async()=>{ 
        try {
            const response = await Axios.post(`http://localhost:5000/admin`,{token:Cookies.get('jwttoken')});
            setAdmin(response.data.admin)
            setFlag(1)
        } catch (error) {              
            setMyError(1)
        }
    }
    
    if(myError===1)
    return <Redirect to="/AccessDenied"/>
    
    return (
        <React.Fragment>            
            <div className="container my-5">            
                {flag?
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flag?admin.history.map((ele)=>{
                            return(
                                <React.Fragment>
                                    <tr key={ele.tid}>
                                        <th scope="row">{ele.date}</th>
                                        <td>{ele.tid}</td>
                                        <td>{ele.total}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        }):null}
                    </tbody>
                </table>:null}
            </div>
        </React.Fragment>
    )
}


export default AdminHistory;