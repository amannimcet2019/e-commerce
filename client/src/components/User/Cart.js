import Axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

let Cart=()=>{
    const [flag,setFlag]=useState(0);
    const [loading,setLoading]=useState(0); 
    const [paymentDone,setPaymentDone]=useState(0)
    const [products,setProducts]=useState([])
    const [user,setUser]=useState({})
    const [address,setAddress]=useState("")
    const [myError,setMyError]=useState(0)
    useEffect(()=>fun(),[flag]) 
    const fun=async()=>{ 
        try {
            const response = await Axios.post(`http://localhost:5000/user`,{token:Cookies.get('jwttoken')});
            setProducts([...response.data.user.cart])
            setUser(response.data.user)
        } catch (error) {
            if(error.response.status===400)
                window.alert("Login First")
            setMyError(1)
        }        
    }
    
    let sum=0;
    products.forEach((item)=>sum+=item.product.price*item.product.quantity)
    
    if(myError===1)
    return <Redirect to="/Login"/>

    if(products.length===0)
    return <React.Fragment>
        <div className="container my-3">
            <div className="row">
                <div className="col text-center">
                    <h1>Hi {user.name} your cart is Empty</h1>                    
                </div>
            </div>
        </div>
    </React.Fragment>

    return(
        <React.Fragment>                        
            {products.length===0?<div className="spinner-border mt-3 ml-3" role="status">
                <span className="sr-only">Loading...</span>
                </div>:
            <div className="container my-3">
                <div className="row">
                    <h1 className="text-center mb-5">Hi {user.name} your cart has {products.length} products</h1>                    
                    {loading?<div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                    </div>:products.map((product)=>{                                                        
                        return (
                            <React.Fragment>
                                <div className="col-md-4 mt-3 d-flex justify-content-center"><img src={product.product.image} alt="imag" style={{height:"300px"}}/></div>
                                <div className="col-md-6 mt-3">                                    
                                    <table className="table">                                    
                                        <tbody>                                            
                                            <tr key={product.product.name}>
                                                <th scope="row">Name</th>
                                                <td>{product.product.pname}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Price</th>
                                                <td>{product.product.price}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Quantity</th>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-secondary px-3"
                                                        onClick={()=>{
                                                            products.forEach((item)=>{
                                                                if(item.product.pname===product.product.pname)
                                                                    item.product.quantity=item.product.quantity>1?item.product.quantity-1:1;
                                                                setProducts([...products])
                                                            })
                                                        }}>-</button>
                                                    <span className="px-3">{product.product.quantity}</span>
                                                    <button className="btn btn-sm btn-outline-secondary px-3"
                                                        onClick={()=>{
                                                            products.forEach((item)=>{
                                                                if(item.product.pname===product.product.pname)
                                                                    item.product.quantity+=1;
                                                                setProducts([...products])
                                                            })
                                                        }}>+</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td>{product.product.quantity*product.product.price}</td>
                                            </tr>
                                        </tbody>                                                     
                                        <button className="btn btn-sm btn-danger mt-3 ml-2"
                                                    onClick={async()=>{
                                                        setLoading(1)
                                                        await Axios.post("http://localhost:5000/cartdelete",{
                                                            token:Cookies.get("jwttoken"),
                                                            del:product.product.pname
                                                        })
                                                        setFlag(1)
                                                        setFlag(0)
                                                        setLoading(0)
                                                    }}>Remove</button>
                                    </table>                                        
                                </div>
                            </React.Fragment>
                        )
                    })}                
                </div>
                {!loading?
                <React.Fragment>
                    <div className="container mt-5">
                        <div className="row">
                        <div className="col-md-5">
                                <div className="card mt-3">
                                    <div className="card-header">
                                        <h4 className="">Bill To :</h4>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="ml-3">Name : {user.name}<br/></h6>                    
                                        <h6 className="ml-3">M : {user.mobile}<br/></h6>                    
                                        <h6 className="ml-3">Billing Address :</h6>
                                        <textarea className="ml-2 form-control" 
                                            onChange={(event)=>setAddress(event.target.value)}
                                            value={address}/>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="card mt-3">
                                    <div className="card-header">
                                        <h4 className="">Summary</h4>                                        
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h6>Subtotal</h6>
                                            <h6 className="ml-auto">{sum}.00</h6>
                                        </div>
                                        <div className="d-flex">
                                            <h6>Tax</h6>
                                            <h6 className="ml-auto">0.00</h6>
                                        </div>
                                        <br/>
                                        <div className="d-flex border-top py-2">
                                            <h6>Total</h6>
                                            <h6 className="ml-auto">{sum}.00</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/Products`}><button className="ml-3 btn btn-danger">Back</button></Link>
                                        <button className="btn btn-primary ml-3" onClick={async()=>{
                                            const obj={
                                                address:address,
                                                total:sum,                                
                                                date:new Date().toLocaleString(),
                                                token:Cookies.get('jwttoken')
                                            }             
                                            try {
                                                await Axios.post('http://localhost:5000/payment',obj);
                                                window.alert("Payment Successful")
                                                setPaymentDone(1)
                                            } catch (error) {
                                                if(error.response.status===400)
                                                    window.alert("Address Field required")
                                            }               
                                        }}>Proceed to pay</button> <span className="h6"> Secured Payment <i class="fas fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>:null}
            </div>
            }
            {paymentDone?<Redirect to="/UserHistory"/>:null}
        </React.Fragment>
    )
}

export default Cart;            