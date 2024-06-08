import React from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/getSingleproduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/relatedProduct/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
      <div className="row ">
        <div className="col-md-6 p-4">
          <img
            src={`http://localhost:8000/product/productPhoto/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ height: "300px", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div className="col-md-6 p-4 mt-2">
          <h1 className="text-center">Product Details</h1>
          <h6>
            <b>Name : </b>
            {product.name}
          </h6>
          <h6>
            <b>Description : </b>
            {product.description}
          </h6>
          <h6>
            <b>Price : </b>
            ₹{product.price}
          </h6>
          <h6>
            <b>Category : </b> {product?.category?.name}
          </h6>
          <button
            className="btn btn-dark mt-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      </div>
      <hr />
      
      <div className="container mt-4">
      <h3>Similar Products ➡️</h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="row mt-4">
          {relatedProducts?.map((p) => (
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

export default ProductDetails;
