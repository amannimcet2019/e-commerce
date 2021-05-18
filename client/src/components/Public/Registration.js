import React, { useState } from 'react';
import Axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

let Registration =()=>{
    let initialState={
        name:"",
        mobile:"",
        email:"",
        pass:"",
        cpass:""
    }
    let [state,setState]=useState(initialState)
    let [submitted,setSubmitted]=useState(0)
    let [passType,setpassType]=useState("password")
    let [error,setError]=useState()
    const send=async (event)=>{
        event.preventDefault();                                 
        try {
            await Axios.post("http://localhost:5000/registration",state)
            window.alert("Registration successful");
            setSubmitted(1)
        } catch (error) {
            if(error.response.status===406)
                setError("All fields required, try again");
            else if(error.response.status===401)
                setError("Password Not Matched, try again");
            else if(error.response.status===409)
                setError("Email already exist, please try again with another email");
        }        
    }
    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(state)}</pre> */}
            {submitted?<Redirect to="/Login"/>:
            <div className="mt-5 container">
                <div className="row">
                    <div className="col-md-7 mx-auto">
                        <div className="card mb-5">
                            <div className="card-header bg-light">
                                <h3>Registration</h3>
                            </div>
                            <form onSubmit={send}>
                                <div className="card-body">
                                    Name : <input type="text" value={state.name} className="form-control" onChange={(event)=>{
                                        setState({
                                            ...state,
                                            name:event.target.value
                                        })
                                    }}/>
                                    
                                    Mobile : <input type="text" value={state.mobile} className="form-control" onChange={(event)=>{
                                        setState({
                                            ...state,
                                            mobile:event.target.value
                                        })
                                    }}/>
                                    Email : <input type="text" value={state.email} className="form-control" onChange={(event)=>{
                                        setState({
                                            ...state,
                                            email:event.target.value
                                        })
                                    }}/>
                                    Password : <input type={passType} value={state.pass} className="form-control" onChange={(event)=>{
                                        setState({
                                            ...state,
                                            pass:event.target.value
                                        })
                                    }}/>
                                    Confirm Password : <input type={passType} value={state.cpass} className="form-control" onChange={(event)=>{
                                        setState({
                                            ...state,
                                            cpass:event.target.value
                                        })
                                    }}/>
                                    <input className="mt-3 d-inline" type="checkbox" id="id" onClick={(event)=>{
                                        if(event.target.checked)
                                            setpassType("text")
                                        else
                                            setpassType("password")
                                    }} />                           
                                    <label className="form-check-label pl-2 " htmlFor="id">Show Password</label>
                                    <h5 className="text-danger mt-2 mb-0">{error?error:null}</h5>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-info" type="submit">Register</button>
                                    <Link to="/Login"className="ml-3 text-primary"> Already have account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default Registration;