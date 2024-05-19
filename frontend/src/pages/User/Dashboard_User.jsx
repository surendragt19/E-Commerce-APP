import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/authC'
import UserMenu from '../../components/layout/UserMenu'

const Dashboard_User = () => {
  const [auth]=useAuth()
  return (
    <Layout>
    <div  className='container-fluid mt-2 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card p-3 w-75'>
            <h3>{auth?.user?.name}</h3>
            <h3>{auth?.user?.email}</h3>
          </div>
        </div>
      </div>
    </div>
</Layout>
    
  )
}

export default Dashboard_User