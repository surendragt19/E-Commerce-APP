import React from 'react'
import Layout from '../../components/layout/Layout'
import ADminMenu from '../../components/layout/ADminMenu'

const Users = () => {
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <ADminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users