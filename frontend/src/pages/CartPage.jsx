import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/authC';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => {
        total += item.price;
      });
      return total.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = pid => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
      toast.success('Item removed');
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('http://localhost:8000/product/braintree/payment', {
        nonce,
        cart
      });
      setLoading(false);
      setCart([]);
      localStorage.removeItem('cart');
      toast.success('Payment successful');
      navigate('/dashboard/user/orders');
    } catch (error) {
      console.log(error);
      toast.error('Payment failed');
      setLoading(false);
    }
  };

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
                    auth?.token ? '' : 'First login to checkout Items'
                  }`
                : 'Your Cart Is Empty'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map(p => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/product/productPhoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
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
          <div className="col-md-4">
            <h2 className="text-center">Cart Summary</h2>
            <h5 className="text-center">Total | Checkout | Payment</h5>
            <hr />
            <h4 className="text-center">Total: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3 text-center">
                  <h4>Current Address</h4>
                  <hr />
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3 text-center">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate('/login', {
                        state: '/cart',
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <center>
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary m-2"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
            </center> 
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
