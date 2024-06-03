import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard_User from './pages/User/Dashboard_User'
import PrivateRoute from './components/routes/Private'
import Forget from './pages/auth/Forget'
import AdminRoute from './components/routes/Admin'
import Dasboard from './pages/Admin/Dasboard'
import Create_Category from './pages/Admin/Create_Category'
import Create_Product from './pages/Admin/Create_Product'
import Users from './pages/Admin/Users'
import Profile from './pages/User/Profile'
import Oders from './pages/User/Oders'
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
function App() {
 

  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/category/:slug' element={<CategoryProduct/>}/>
    <Route path='/product/:slug' element={<ProductDetails/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/policy' element={<PrivacyPolicy/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    <Route path='/forget' element={<Forget/>}/>
    {/* protected Route */}
    
    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<Dashboard_User/>}/>
    <Route path='user/profile' element={<Profile/>}/>
    <Route path='user/orders' element={<Oders/>}/>
    </Route>

    <Route path='/dashboard' element={<AdminRoute/>}>
    <Route path='admin' element={<Dasboard/>}/>
    <Route path='admin/create-product' element={<Create_Product/>}/>
    <Route path='admin/create-category' element={<Create_Category/>}/>
    <Route path='admin/products' element={<Products/>}/>
    <Route path="admin/product/:slug" element={<UpdateProduct />} />
    <Route path='admin/users' element={<Users/>}/>
    </Route>
   </Routes>
   
   </>
  )
}

export default App
