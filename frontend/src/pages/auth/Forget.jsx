import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './auth.css'

const Forget = () => {
    const [email,setEmail] =useState("")
    const [newpassword,setNwePassword] =useState("")
    const [answer,setAnswer] =useState("")

const navigate=useNavigate()
const location=useLocation()
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const response=await axios.post('http://localhost:8000/api/forget',{
              email,newpassword,answer
            })
           if( response.data.success){
            toast.success(response.data.message)
            navigate('/login')
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
        <h4 className="title">FORGET PAASWORD</h4>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
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
            id="exampleInputPassword1"
            placeholder="Enter New Password"
            required
            value={newpassword}
            onChange={(e)=>setNwePassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Faviorite Game"
            required
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
        <div style={{padding:'20px',textAlign:'center'}}>Already Know Password <Link style={{textDecoration:'none',color:'red'}} to='/login'>Login</Link></div>
      </form>
    </div>
  </Layout>
  )
}

export default Forget