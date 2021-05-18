const adminLogin = () =>{
    return {
        type : "ADMINLOGIN",
        payload:"ADMIN IS ACTIVE"
    }
}

const userLogin = () =>{
    return {
        type : "USERLOGIN",
        payload:"USER IS ACTIVE"
    }
}
const noLogin = () =>{
    return {
        type : "NOLOGIN",
        payload : "NO ONE IS ACTIVE"
    }
}

module.exports = { adminLogin , userLogin , noLogin }