import { createContext, useState } from "react";

export const userContext = createContext();


export default function UserContextProvider(prop) {
      console.log(prop)

    let [token,setToken] = useState(localStorage.getItem('userToken'));

    function changeToken(newToken){
      newToken?localStorage.setItem('userToken',newToken):localStorage.removeItem('userToken');
      setToken(newToken);
    }

  return (
    <userContext.Provider value={{token,changeToken}}>
        {prop.children}
    </userContext.Provider>
  )
}
