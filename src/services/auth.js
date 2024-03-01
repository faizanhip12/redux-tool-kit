import http from "../http-common";

export const userRoles = () => {
    return http.get("/role")
}

export const signup =(data)=>{
    console.log("signup",data)
    return http.post("/users",data)
}
export const getUser =()=>{
    return http.get("/users")
}


export const signin =(data)=>{
    return http.post("/auth/signin",data)
}