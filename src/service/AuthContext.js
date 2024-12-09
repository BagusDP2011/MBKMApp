import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired } from './Auth.Service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired()) {
      console.log("A")
      setIsLoggedIn(true);
    }else{
      console.log("A")
      setIsLoggedIn(false);
    }
  }, []);

  const loginContext = (token) => {
    console.log(token)
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logoutContext = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
