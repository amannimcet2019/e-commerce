import Axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

let ProductDetails=(props)=>{
    const [product,setProduct]=useState()
    useEffect(()=>fun(),[])    
    const fun=async()=>{        
        const response = await Axios.get(`http://localhost:5000/product/${props.match.params.id}`);
        setProduct(response.data.product)
    }
    return(
        <React.Fragment>            
            {!product?<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>:
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-4 mt-3 d-flex justify-content-center"><img src={product.image} style={{height:"300px"}}/></div>
                    <div className="col-md-6 mt-3">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>{product.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Category</th>
                                    <td>{product.category}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Details</th>
                                    <td>{product.details}</td>
                                </tr>
                            </tbody>                        
                        </table>    
                        <Link to={`/Products`}><button className="btn btn-danger ml-2">Back</button></Link>
                        <button onClick={async()=>{
                            try {
                                const res = await Axios.post('http://localhost:5000/addtocart',{product,token:Cookies.get('jwttoken')})
                                console.log(res);
                                window.alert("Added to cart");
                            } catch (error) {                                                            
                                if(error.response.status===401)
                                    window.alert("Already in Cart")                                                            
                                else
                                    window.alert("Login First")
                            }
                        }}className="btn btn-success ml-3">Add To Cart</button>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    )
}

export default ProductDetails;            