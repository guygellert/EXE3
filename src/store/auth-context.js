
import React,{useState} from "react";

const AuthContext = React.createContext({
    email:'',
    userId:'',
    token: '',
    isLoggedin: false, 
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {

    const [token , setToken] = useState (null);
    const [email , setEmail] = useState (null);
    const [userId , setUserId] = useState (null);
    const userIsLoggin = !!token; 

    const loginHandler = (token,email,localId) => {
        setToken (token);
        setEmail(email)
        setUserId(localId)
    }
    const logoutHandler = () => {
        setToken(null);
    }

    const contextValue = {
        token: token, 
        isLoggedin: userIsLoggin, 
        login: loginHandler,
        logout: logoutHandler,
        email:email,
        userId:userId
    };


    return <AuthContext.Provider value = {contextValue}>
        {props.children}
    </AuthContext.Provider> 

}

export default AuthContext;


