import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart,setCart]=useCart()
  const navigate=useNavigate()
  return (
    <Layout>
      <div className="container mt-3">
      <h1 style={{textAlign:'center',marginTop:'20px'}}>Search Resuts</h1>
          <h6 style={{textAlign:'center'}}>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        <div className="row mt-4">
        {values?.results.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p._id}>
              <div className="card h-100">
                <div style={{ width: '100%', height: '275px', overflow: 'hidden' }}>
                  <img
                     src={`http://localhost:8000/product/productPhoto/${p._id}`}
                    className="card-img-top p-3"
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <h5 className="card-title">₹{p.price}</h5>
                  <div className="mt-auto">
                    <button
                      className="btn btn-info me-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      MORE DETAILS
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;