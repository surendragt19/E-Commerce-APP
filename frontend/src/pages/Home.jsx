import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/authC'

const Home = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layout>
        <h1>Home</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Home