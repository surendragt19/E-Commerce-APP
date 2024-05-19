import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard_User from './pages/dasboard/Dashboard_User'
import PrivateRoute from './components/routes/Private'
import Forget from './pages/auth/Forget'
function App() {
 

  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/policy' element={<PrivacyPolicy/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    <Route path='/forget' element={<Forget/>}/>
    {/* protected Route */}
    
    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='' element={<Dashboard_User/>}/>
    </Route>
   </Routes>
   
   </>
  )
}

export default App
