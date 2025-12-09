//Api service layer
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api/auth",
    withCredentials : true, //sends cookie for session
})

//Get CSRF Token
export const getCsrfToken = () =>
    api.get("/csrf-token");

//Register
export const registerUser = (data, csrf) => 
    api.post("/register", data,{
        headers: {"X-CSRF-Token": csrf},
    })

//Login
export const loginUser = (data, csrf) => 
    api.post("/login", data,{
        headers: {"X-CSRF-Token": csrf},
    })

//Dashboard
export const getDashboard = () =>
    api.get("/dashboard")

//Logout
export const logoutUser = (csrf) =>
  api.post("/logout", {}, { headers: { "X-CSRF-Token": csrf }});

export default api;