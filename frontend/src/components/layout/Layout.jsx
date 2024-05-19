import Footer from "./Footer"
import Header from "./Header"
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
       <Header/>
    <main style={{minHeight:'80vh'}}>
    {children}
    <Toaster/>
    </main>
  <Footer/>
    </>
   
  )
}

export default Layout