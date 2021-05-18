import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';


const Category=()=>{
    const [categories,setCategories]=useState([]) 
    const [state,setState]=useState("")
    const [flag,setFlag]=useState(0)
    const [myError,setMyError]=useState(0)
    useEffect(()=>fun(),[flag])    
    const fun=async ()=>{
        try {            
            const res = await Axios.post("http://localhost:5000/categoryadmin",{token:Cookies.get('jwttoken')});       
            setCategories([...res.data.categories])
        } catch (error) {              
            setMyError(1)            
        }
    }
    
    if(myError===1)
    return <Redirect to="/AccessDenied"/>
    
    return (
        <React.Fragment>                        
            <div className="container">
                <div className="row py-3">     
                    <form className="col-md-6" onSubmit={async(event)=>{                
                        event.preventDefault();
                        await Axios.post("http://localhost:5000/category",{name:state});                
                        setFlag(0)
                        setFlag(1)
                    }}>                      
                        <div className="d-flex">
                            <input className="form-control" 
                                type="text" 
                                placeholder="Enter Category" 
                                onChange={(event)=>setState(event.target.value)}
                                value={state}/>                    
                            <button className="btn btn-info mx-3" type="submit">Add</button>
                        </div>       
                    </form>
                    {categories.length > 0?<div className="col-md-5 mt-5">
                        {categories.map((category)=>{
                            return(
                                <React.Fragment>
                                    <table className="table">
                                        <tbody>                                            
                                            <tr key={category.name}className="text-center">
                                            <th className="text-center " scope="row">{category.name}</th>
                                            <td className="text-right">
                                                <button className="btn btn-sm btn-danger"
                                                    onClick={async()=>{
                                                        await Axios.put("http://localhost:5000/category",category)
                                                        setFlag(0)
                                                        setFlag(1)
                                                    }}>Remove</button>
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </React.Fragment>
                            )
                        })}
                    </div>:null}
                </div>
            
            </div>
        </React.Fragment>
    )
}

export default Category;