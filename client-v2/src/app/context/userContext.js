// /app/context/UserContext.js
'use client'
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const res = await fetch('/api/users/currentuser');
    const data = await res.json();
    setCurrentUser(data.currentUser);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
