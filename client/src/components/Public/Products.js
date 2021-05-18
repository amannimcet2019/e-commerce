import Axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Products=()=>{
    const state = useSelector((state)=>state.loginState.active)
    const [search,setSearch]=useState("")
    const [flag,setFlag]=useState(0)
    const [categories,setCategories]=useState([])
    const [all,setAll]=useState([])
    let [products,setProducts]=useState([])
    const [token,setToken]=useState("");

    useEffect(()=>fun(),[flag])    
    const fun=async()=>{
        const res = await Axios.get("http://localhost:5000/category");        
        setCategories([...res.data.categories])
        const response = await Axios.get("http://localhost:5000/products");        
        setProducts([...response.data.products])        
        setAll([...response.data.products])
        setToken(Cookies.get('jwttoken'))
    }

    return (
        <React.Fragment>            
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-md-10 col-5 pl-3 pr-0">
                        <input placeholder="Search" className="form-control" type="text" onChange={event=>setSearch(event.target.value)}/>
                    </div>
                    <div className="col-md-2 col-7">
                        <DropdownButton className="d-inline" variant="info" title=" Filter ">
                            <Dropdown.Item onClick={()=>setProducts(all)}>All Products</Dropdown.Item>
                            {categories.map((category)=>{
                                return(
                                    <React.Fragment>
                                        <Dropdown.Item key={category} onClick={()=>{
                                            const temp = all.filter(product=>product.category===category.name)                                            
                                            setProducts(temp)
                                        }}><span key={category._id}>{category.name}</span></Dropdown.Item>
                                    </React.Fragment>
                                )
                            })}
                        </DropdownButton>
                        <DropdownButton className="d-inline pl-2" variant="info" title=" Sort By ">
                            <Dropdown.Item onClick={()=>{
                                let temp = [...products]
                                temp.sort((a,b)=>-1)                                
                                setProducts(temp)
                            }}>Newest</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                let temp = [...products]
                                temp.sort((a,b)=>a.price-b.price)                                
                                setProducts(temp)
                            }}>Price : Low-High</Dropdown.Item>                            
                            <Dropdown.Item onClick={()=>{
                                let temp = [...products]
                                temp.sort((a,b)=>b.price-a.price)                                
                                setProducts(temp)
                            }}>Price : High-Low</Dropdown.Item>                             
                        </DropdownButton>
                    </div>
                </div>
                <div className="mt-2">                    
                    {all.length===0&&products.length===0?<div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                    :
                    <div className="row">
                        {products.filter((product)=>{
                            if(search==="")
                                return product;
                            else if(product.name.toLowerCase().includes(search.toLowerCase()))
                                return product;
                        }).map((product)=>{
                            return(
                                <React.Fragment>
                                    <div key={product._id} className="col-md-3 my-3">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <img src={product.image} alt="my_image" style={{height:"270px"}}/>
                                            </div>
                                            <div className="card-footer">
                                                <h3 className="pl-2">{product.name}</h3>
                                                <h6 className="pl-2">Price : <span className="text-danger">{product.price}</span></h6>
                                                <div className="mt-3">
                                                    {state==="ADMIN IS ACTIVE"?
                                                        <React.Fragment>
                                                            <Link to={`/UpdateProduct/${product._id}`}><button className="btn btn-success">Edit product</button></Link>
                                                            <button onClick={async()=>{                                                                
                                                                try {
                                                                    const res = await Axios.put('http://localhost:5000/deleteProduct',{product})                                                                    
                                                                    window.alert("Product Deleted SuccessFully");
                                                                } catch (error) {                      
                                                                    console.log({error})
                                                                }
                                                                setProducts([])
                                                                setFlag(1)
                                                                setFlag(0)
                                                            }}className="btn btn-danger ml-1">Remove</button>
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                        <Link to={`/ProductDetails/${product._id}`}><button className="btn btn-info">View Details</button></Link>
                                                        <button onClick={async()=>{
                                                            try {
                                                                const res = await Axios.post('http://localhost:5000/addtocart',{product,token})
                                                                console.log(res);
                                                                window.alert("Added to cart");
                                                            } catch (error) {                                                            
                                                                if(error.response.status===401)
                                                                    window.alert("Already in Cart")                                                            
                                                                else
                                                                    window.alert("Login First")
                                                            }
                                                        }}className="btn btn-success ml-1">Add To Cart</button>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>                          
                                </React.Fragment>
                            )
                        })                        
                        }
                    </div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Products;