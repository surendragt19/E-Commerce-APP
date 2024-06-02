import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authC'
import SearchInput from '../Forms/SearchInput'
import useCategory from '../../hooks/useCategory'


const Header = () => {
  const [auth,setAuth]=useAuth()

  const categories=useCategory()


  const handLogOut=()=>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem('auth')
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <Link to="/" className="navbar-brand">
              🛒 Khatu Shyam Traders
            </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
     
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <SearchInput />
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>

        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle"  data-bs-toggle="dropdown" to={"/categories"}>
  Categories
  </Link>
  
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

  <li><Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
 <li><hr className="dropdown-divider" /></li>

  {categories?.map((ele, index) => (
    <li key={index}><Link className="dropdown-item" to={`/category/${ele.slug}`}>{ele.name}</Link></li>
  ))}
</ul>
</li>

{/* authetication */}

      {
        !auth.user ? (<>
          <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </>) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handLogOut}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart(0)</Link>
        </li>
        </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header