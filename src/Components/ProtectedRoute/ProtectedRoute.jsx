import React, { useContext } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';
import { userContext } from '../../Contexts/UserContext';

export default function ProtectedRoute(props) {
    let{token}=useContext(userContext);
    if(token)
      return (props.children)
    else
      return (<Navigate to='/login'/>)
}
