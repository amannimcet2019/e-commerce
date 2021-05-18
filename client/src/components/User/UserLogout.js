import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";    
import { noLogin } from '../../redux/actions/loginActions'
import {useDispatch} from 'react-redux';

const UserLogout=()=>{
    const dispatch=useDispatch();
    const [logout,setLogout]=useState(0)
    const [myError,setMyError]=useState(0)
    useEffect(()=>fun(),[]) 
    const fun=async()=>{ 
        try {            
            await Axios.post(`http://localhost:5000/userlogout`,{token:Cookies.get('jwttoken')});            
            Cookies.remove('jwttoken', { path: '' });
            window.alert("Logout Successful")
            dispatch(noLogin())
            setLogout(1)
        } catch (error) {
            if(error.response.status===400)
                window.alert("Login First")
            setMyError(1)
        }        
    }
    
    if(myError===1)
        return <Redirect to="/Login"/>
    else if(logout===1)
        return <Redirect to="/"/>
    return(
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default UserLogout;