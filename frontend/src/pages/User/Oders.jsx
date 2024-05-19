import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Oders = () => {
  return (
    <Layout>
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
          <h1>Orders Details</h1>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Oders