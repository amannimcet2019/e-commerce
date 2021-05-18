import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

const UserHistory = () =>{
    const [user,setUser]=useState({})
    const [flag,setFlag]=useState(0)
    const [myError,setMyError]=useState(0)
    useEffect(()=>fun(),[]) 
    const fun=async()=>{ 
        try {
            const response = await Axios.post(`http://localhost:5000/user`,{token:Cookies.get('jwttoken')});
            setUser(response.data.user)
        } catch (error) {
            if(error.response.status===400)
                window.alert("Login First")
                setMyError(1)
        }        
        setFlag(1)
    }
    
    if(myError===1)
    return <Redirect to="/Login"/>
    
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
                        <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flag?user.history.map((ele)=>{
                            return(
                                <React.Fragment>
                                    <tr key={ele.tid}>
                                        <th scope="row">{ele.date}</th>
                                        <td>{ele.tid}</td>
                                        <td>{ele.total}.00</td>
                                        <td>{ele.address}</td>
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


export default UserHistory;