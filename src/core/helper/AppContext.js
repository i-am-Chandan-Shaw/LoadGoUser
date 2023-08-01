// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalData, updateGlobalData] = useState({});

  const setGlobalData=(key,data)=>{
    updateGlobalData((prevData)=>{
      prevData[key]=data;
      return prevData
    })
  }

  return (
    <AppContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </AppContext.Provider>
  );
};
