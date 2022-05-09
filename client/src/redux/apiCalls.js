import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart()); 
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
        console.log(res)
    }catch(err) {
        dispatch(loginFailure())
    } 
}

export const logout = async (dispatch, user) => {
    dispatch(logoutUser());
 
} 

export const register = async (user) => {
    
    try{
        await publicRequest.post("auth/register", user)
    }catch(error) {
    }
}