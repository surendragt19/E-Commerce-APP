import React from 'react'
import Layout from '../../components/layout/Layout'
import ADminMenu from '../../components/layout/ADminMenu'
import { useAuth } from '../../context/authC'

const Dasboard = () => {
  const [auth]=useAuth()
  return (
    <Layout>
        <div  className='container-fluid mt-2 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <ADminMenu/>
            </div>
            <div className='col-md-9 mt-5'>
              <div className='card p-3'>
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dasboard