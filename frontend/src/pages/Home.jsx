import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cart'
import toast from 'react-hot-toast';
import '../style/home.css'
const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart,setCart]=useCart()
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/category/getCategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/product/productList/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/product/productCount");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/product/productList/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/product/productFilters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
<div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src='images/f1.png' className="d-block w-100 img1" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="images/f2.png" className="d-block w-100 img1" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="images/f4.png" className="d-block w-100 img1" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>



<div className="container-fluid row mt-3 home-page p-4">
        <div className="col-md-3 filters">
          <h4 className="text-center"><u style={{textTransform:'uppercase'}}>Filter By Category</u></h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4"><u style={{textTransform:'uppercase'}}>Filter By Price</u></h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger m-3 m-1"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center"><u>ALL PRODUCTS</u></h2>
          <div className="d-flex flex-wrap w-100">
  {products?.map((p) => (
    <div className="homecard m-2 flex-grow-1" key={p._id} style={{minHeight:'360px' }}>
    <div style={{ width: '100%', height: '275px', overflow: 'hidden' }}>
    <img
      src={`http://localhost:8000/product/productPhoto/${p._id}`}
      className="card-img-top p-3"
      alt={p.name}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
      <div className="card-body">
        <div className="homecard-name-price">
          <h5 className="card-title">{p.name}</h5>
          <h5 className="card-title homecard-price">
            ₹{p.price}
          </h5>
        </div>
        <p className="homecard-text">
          {p.description.substring(0, 60)}...
        </p>
        <div className="card-name-price">
          <button
            className="btn1 btn btn-info ms-1"
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            MORE DETAILS
          </button>
          <button
            className="btn1 btn btn-dark ms-1"
            onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, p])
              );
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART 
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore.."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home