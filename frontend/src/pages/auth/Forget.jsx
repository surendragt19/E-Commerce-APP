import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

const Forget = () => {
    const [email,setEmail] =useState("")
    const [newPassword,setNwePassword] =useState("")
    const [answer,setAnswer] =useState("")

const navigate=useNavigate()
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const res=await axios.post('http://localhost:8000/api/forgetPasswd',{
                email,
                newPassword,
                answer,
              });
              if (res && res.data.success) {
                toast.success(res.data && res.data.message);
        
                navigate("/login");
              } else {
                toast.error(res.data.message);
              }
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong");
            }
          };
  return (
    <Layout>
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">FORGET PAASWORD</h4>
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
            placeholder="Enter New Password"
            required
            value={newPassword}
            onChange={(e)=>setNwePassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
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