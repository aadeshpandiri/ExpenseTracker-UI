import React, { useState, useEffect } from 'react'
import SharedContext from './SharedContext'
import { useNavigate } from "react-router-dom";
const SharedState = (props) => {

  const [token, setToken] = useState();
  const [loader, setLoader] = useState(false);

  const [userdata,setUserData]=useState()
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear();
    navigate('/')
    window.location.reload();
  }
  useEffect(() => {
    if (window) {
      setToken(sessionStorage.getItem('access_token'))
      setUserData(sessionStorage.getItem('userdata'))
      console.log(sessionStorage.getItem('userdata'))
    }
  }, [])

  return (
    <SharedContext.Provider value={{ 'token': token, 'setToken': setToken,'userdata':userdata,'setUserData':setUserData , 'loader': loader, 'setLoader': setLoader,'handleLogout':handleLogout}}>{
      props.children
    }</SharedContext.Provider>
  )
}

export default SharedState