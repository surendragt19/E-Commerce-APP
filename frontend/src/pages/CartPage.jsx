import React from 'react'
import Layout from '../components/layout/Layout'
import {useCart} from '../context/cart'
import {useAuth} from '../context/authC'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const CartPage = () => {
  const [cart,setCart]=useCart()
  const[auth,setAuth]=useAuth()
  const navigate=useNavigate()


   //total price
   const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //removeCartItem

  const removeCartItem=(pid)=>{
    try {
      let myCart=[...cart]
      let index=myCart.findIndex(item=>item._id===pid)
      myCart.splice(index,1)
      setCart(myCart)
      localStorage.setItem('cart',JSON.stringify(myCart))
      toast.success("Item remove")

      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
          <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `${cart.length} items in your cart ${
                    auth?.token ? "" : "First login to checkout Items"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/product/productPhoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4'>
            <h2 className='text-center'>Cart Summery</h2>
            <h5  className='text-center'>Total | Checkout | Payment</h5>
            <hr/>
            <h4 className='text-center'>Total : {totalPrice()}</h4>
          </div>
          </div>
        </div>
    </Layout>
  )
}

export default CartPage