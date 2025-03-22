import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children,authentication=true}){
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if(authStatus === true){
            navigate('/')
        }else{
            navigate('/login')
        }
        setLoader(false)
    } ,[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}