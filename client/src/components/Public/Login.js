import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin,adminLogin } from '../../redux/actions/loginActions'

const Login=()=>{
    const dispatch = useDispatch()
    let initialState={
        email:"",
        pass:""
    }
    let [userState,setUserState]=useState(initialState)
    let [adminState,setAdminState]=useState(initialState)
    let [submitted,setSubmitted]=useState(0)
    let [passType,setpassType]=useState("password")
    let [userError,setUserError]=useState()
    let [adminError,setAdminError]=useState()
    let [spinner,setSpinner]=useState(0)
    return(
        <React.Fragment>            
            {/* <pre>{JSON.stringify(userState)}{JSON.stringify(adminState)}</pre> */}
            {submitted?<Redirect to="/Products"/>:            
            <div className="my-5 container">
                <div className="row">
                    <div className="col-md-7 mx-auto">                    
                    <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
                    <Tab eventKey="user" title="User">
                    <div className="card mb-5">
                            <div className="card-header bg-light">
                                <h3>Login</h3>
                            </div>
                            <form onSubmit={async (event)=>{event.preventDefault();
                                setSpinner(1);
                                try {
                                    const res = await Axios.post("http://localhost:5000/userlogin",userState);
                                    console.log(res.data);
                                    Cookies.set('jwttoken', res.data.token,{ 
                                        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
                                        path:'/'
                                    });                                    
                                    setSpinner(0)
                                    window.alert('Login successful')
                                    dispatch(userLogin())
                                    setSubmitted(1)
                                } catch (error) {
                                    if(error.response.status===406)
                                        setUserError("All fields required, try again");                                    
                                    else if(error.response.status===400)
                                        setUserError("Invalid email password");
                                    setSpinner(0)
                                }        
                            }}>
                                <div className="card-body">
                                    Email : <input type="text" value={userState.email} className="form-control" onChange={(event)=>{
                                        setUserState({
                                            ...userState,
                                            email:event.target.value
                                        })
                                    }}/>
                                    Password : <input type={passType} value={userState.pass} className="form-control" onChange={(event)=>{
                                        setUserState({
                                            ...userState,
                                            pass:event.target.value
                                        })
                                    }}/>
                                    <input className="mt-3 d-inline" type="checkbox" id="id" onClick={(event)=>{
                                        if(event.target.checked)
                                            setpassType("text")
                                        else
                                            setpassType("password")
                                    }} />                           
                                    <label className="form-check-label pl-2 " htmlFor="id">Show Password</label>
                                    <h5 className="text-danger mt-2 mb-0">{userError?userError:null}</h5>
                                </div>
                                <div className="card-footer">{!spinner?
                                    <button className="btn btn-info" type="submit">Login</button>:
                                    <button className="btn btn-info" type="button">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                        </button>}
                                    <Link to="/Registration"className="ml-3 text-primary"> Create Account</Link>
                                </div>
                            </form>
                        </div>
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                    <div className="card mb-5">
                            <div className="card-header bg-light">
                                <h3>Admin Login</h3>
                            </div>
                            <form onSubmit={async(event)=>{event.preventDefault(); 
                                setSpinner(1);
                                const temp={...adminState,email:"aman@admin.com"};
                                console.log("my",temp)
                                try {
                                    const res = await Axios.post("http://localhost:5000/adminlogin",temp);
                                    console.log(res.data);
                                    Cookies.set('jwttoken', res.data.token,{ 
                                        expires: new Date(new Date().getTime() + 60 * 60 * 1000) ,
                                        path:'/'
                                    });          
                                    setSpinner(0)                          
                                    window.alert('Login successful')
                                    dispatch(adminLogin())
                                    setSubmitted(1)
                                } catch (error) {
                                    if(error.response.status===406)
                                        setAdminError("All fields required, try again");                                    
                                    else if(error.response.status===400)
                                        setAdminError("Invalid email password");
                                    setSpinner(0)
                                }        
                                }}>
                                <div className="card-body">
                                    <div className="pb-2">Email : <h5 className="d-inline text-danger"> aman@admin.com</h5></div>
                                    Password : <input type={passType} value={adminState.pass} className="form-control" onChange={(event)=>{
                                        setAdminState({
                                            ...adminState,
                                            pass:event.target.value
                                        })
                                    }}/>
                                    <input className="mt-3 d-inline" type="checkbox" id="id2" onClick={(event)=>{
                                        if(event.target.checked)
                                            setpassType("text")
                                        else
                                            setpassType("password")
                                    }} />                           
                                    <label className="form-check-label pl-2 " htmlFor="id2">Show Password</label>
                                    <h5 className="text-danger mt-2 mb-0">{adminError?adminError:null}</h5>
                                </div>
                                <div className="card-footer">{!spinner?
                                    <button className="btn btn-danger" type="submit">Login</button>:
                                    <button className="btn btn-danger" type="button">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>}                                    
                                </div>
                            </form>
                        </div>
                    </Tab>
                    </Tabs>
                        
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    )
}

export default Login;