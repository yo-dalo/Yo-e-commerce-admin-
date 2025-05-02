import { createContext, useContext, useState,useEffect } from "react";
import Yo from "../common/Helper/Yo"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    isLogin:false,
    name:"_",
    phone:"",
    email:"",
    id:null,
    
  }); // or use token instead

const isLogin= async()=>{
  
  const res =  await Yo.get("/api/admin-auth/is-login")
   
   const {name,phone,email,id }= res.data
    setAdmin({...admin,
    isLogin:true,
    name:name,
    phone:phone,
    email:email,
    id:id,
      
    });
  
  
}

 useEffect(() => { 
  isLogin()
  }, []);




  const login = async (adminData) => {
   const res =  await Yo.post("/api/admin-auth/login" ,
   //{phoneOrEmail:"1234567891",password:"10"}
   adminData
   )
   const {name,phone,email,id }= res.data
    setAdmin({...admin,
    isLogin:true,
    name:name,
    phone:phone,
    email:email,
    id:id,
      
    });
  };

  const logout = () => {
    setAdmin(null);
    // remove token from storage if used
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
