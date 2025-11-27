//Api service layer
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : true, //sends cookie for session
})

//Get CSRF Token
export const getCsrfToken = () =>
    api.get("/auth/csrf-token");

//Register
export const registerUser = (data, csrf) => 
    api.post("/auth/register", data,{
        headers: {"X-CSRF-Token": csrf},
    })

//Login
export const loginUser = (data, csrf) => 
    api.post("/auth/login", data,{
        headers: {"X-CSRF-Token": csrf},
    })

//Dashboard
export const getDashboard = () =>
    api.get("/auth/dashboard")

//Logout
export const logoutUser = () =>
    api.post("/auth/logout")

export default api;