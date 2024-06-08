import React from 'react'
import { Link } from 'react-router-dom'

const ADminMenu = () => {
  return (
    <>
    <div className="text-center">
        <div className="list-group">
          <h2><Link to='/dashboard/admin' style={{textDecoration:'none',color:'green',fontFamily:'-moz-initial'}}>ADMIN PANEL</Link></h2>
          <Link
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
           <h5><i className="fa-regular fa-square-plus p-1"></i>Create Category</h5> 
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
           <h5><i className="fa-regular fa-circle-plus p-1"></i>Create Product</h5> 
          </Link>
          <Link
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
           <h5><i className="fa-regular fa-circle-plus p-1"></i>Product List</h5> 
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            <h5><i className="fa-regular fa-user p-1"></i>Users</h5>
          </Link>
          <Link
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            <h5><i  className="fa-solid fa-circle-info p-1"></i>Orders</h5>
          </Link>
        

        </div>
      </div>



      
      
    </>
  )
}

export default ADminMenu