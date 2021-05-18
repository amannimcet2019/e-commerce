import React from 'react';
import NavBar from './components/Public/NavBar';
import Footer from './components/Public/Footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/Public/Home';
import Registration from './components/Public/Registration';
import Login from './components/Public/Login';
import Products from './components/Public/Products';
import ProductDetails from './components/Public/ProductDetails';
import CreateProduct from './components/Admin/CreateProduct';
import Category from './components/Admin/Category';
import Cart from './components/User/Cart';
import UserHistory from './components/User/UserHistory';
import UserLogout from './components/User/UserLogout';
import AdminHistory from './components/Admin/AdminHistory';
import AdminLogout from './components/Admin/AdminLogout';
import AccessDenied from './components/Public/AccessDenied';
import PageNotFound from './components/Public/PageNotFound';
import UpdateProduct from './components/Admin/UpdateProduct';

const App =()=>{
  return (
    <React.Fragment>
      <Router>
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Registration" component={Registration}></Route>
            <Route exact path="/Products" component={Products}></Route>            
            <Route exact path="/ProductDetails/:id" component={ProductDetails}></Route>
            <Route exact path="/CreateProduct" component={CreateProduct}></Route>
            <Route exact path="/Login" component={Login}></Route> 
            <Route exact path="/Category" component={Category}></Route>
            <Route exact path="/Cart" component={Cart}></Route>
            <Route exact path="/UserHistory" component={UserHistory}></Route>
            <Route exact path="/UserLogout" component={UserLogout}></Route>
            <Route exact path="/AdminHistory" component={AdminHistory}></Route>
            <Route exact path="/AdminLogout" component={AdminLogout}></Route>
            <Route exact path="/AccessDenied" component={AccessDenied}></Route>
            <Route exact path="/UpdateProduct/:id" component={UpdateProduct}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
         <Footer/>
      </Router>      
    </React.Fragment>
  )
}

export default App;