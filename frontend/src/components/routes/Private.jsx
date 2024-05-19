import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authC'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Spiner from './Spiner'

export default function PrivateRoute(){
    const[ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get('http://localhost:8000/api/user')
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        };
        if(auth?.token) authCheck();
    },[auth?.token])

    return ok ? <Outlet/> : <Spiner/>
}
