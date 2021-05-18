import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateProduct=()=>{
  const [state,setState]=useState({
    image:"",
    name:"",
    price:"",
    details:"",
    category:""
  })
  const [categories,setCategories]=useState([])
  const [submitted,setSubmitted]=useState(0)
  const [myError,setMyError]=useState(0)

  useEffect(()=>fun(),[])
  const fun=async()=>{
    try {            
      const res = await Axios.post("http://localhost:5000/categoryadmin",{token:Cookies.get('jwttoken')});             
      setCategories([...res.data.categories])
    } catch (error) {              
      setMyError(1)      
    }
  }
  
  const update=(event)=>{
    console.log(event.target.value)
    setState({
      ...state,
      [event.target.name]:event.target.value
    })
  }

  const send=async (event)=>{
      event.preventDefault();                                 
      try {
          await Axios.post("http://localhost:5000/createProduct",state)
          window.alert("Product Created successfully");
          setSubmitted(1)
      } catch (error) {
          if(error.response.status===422)
            window.alert("All fields required, try again");
      }        
  }

  
  if(myError===1)
  return <Redirect to="/AccessDenied"/>
  
  return (
      <React.Fragment>
        {submitted?<Redirect to="/Products"/>:        
          <div className="container my-3">
            <div className="row">
              <div className="col-md-6">
                <div className="card-body border">
                  <form onSubmit={send}>                    
                    <span className="h6">Name : </span>
                    <input type="text" className="form-control" name="name" value={state.name} onChange={update}/>
                    <br/>

                    <span className="h6">Price : </span>
                    <input type="number" className="form-control" name="price" value={state.price} onChange={update}/>
                    <br/>

                    <span className="h6">Category : </span>
                    
                    <select className="form-select"value={state.category} onChange={update} name="category">
                      <option value="">--Select--</option>
                      {categories.map((category)=>{
                          return(
                              <React.Fragment>
                                  <option key={category._id}value={category.name}>{category.name}</option>
                              </React.Fragment>
                          )
                      })}                    
                    </select>                    
                    <br/>

                    <span className="h6">Details : </span>
                    <input type="text" className="form-control" name="details" value={state.details} onChange={update}/>
                    <br/>
                    
                    <span className="h6">Product Image : </span><input onChange={async(event)=>{
                        const imageFile=event.target.files[0]
                        const str = await new Promise((resolve, reject) => {
                            let fileReader = new FileReader();
                            fileReader.readAsDataURL(imageFile);
                            fileReader.addEventListener("load", () => {
                              if (fileReader.result) {
                                resolve(fileReader.result);
                              } else {
                                reject("Error Occurred");
                              }
                            });
                          });
                          setState({...state,image:str})
                    }} type="file" className="form-control"/>
                    <br/><br/>  
                    
                    <button type="submit" className="btn btn-info ">Create Product</button>
                    <br/>
                  </form>
                </div>
              </div>
            </div>

          </div>}
      </React.Fragment>
  )
}

export default CreateProduct;

