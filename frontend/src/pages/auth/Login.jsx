import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './auth.css'
import { useAuth } from '../../context/authC';

const Login = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    
    const [auth,setAuth]=useAuth()

const navigate=useNavigate()
const location=useLocation()
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const response=await axios.post('http://localhost:8000/api/login',{
              email,password
            })
           if( response.data.success){
            toast.success(response.data.message)
            //get Value token 
            setAuth({
                ...auth,
                user: response.data.user,
                token: response.data.token,
            })
            //local Storge
            localStorage.setItem('auth',JSON.stringify(response.data))
            navigate(location.state ||'/')
           }
           else{
            toast.error(response.data.message)
           }
            
        } catch (error) {
            console.log(error)
            toast.error("Somthing Went Wrong")
            
        } 
    }
  return (
    <Layout>
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email "
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
        <button type="button" className="btn btn-success" onClick={()=>{navigate('/forget')}}>
          Forget Password
        </button>
        </div>
        <button type="submit" className="btn btn-primary" >
          LOGIN
        </button>
        <div style={{padding:'20px',textAlign:'center'}}>Not A User <Link style={{textDecoration:'none',color:'red'}} to='/register'>Register</Link></div>
      </form>
    </div>
  </Layout>
  )
}

export default Login