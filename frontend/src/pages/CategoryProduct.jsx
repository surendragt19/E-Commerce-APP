import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
  const params = useParams();
  const [cart,setCart]=useCart()
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/productCategory/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found in this category</h6>
        <div className="row">
          {products?.map((p) => (
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

export default CategoryProduct;
