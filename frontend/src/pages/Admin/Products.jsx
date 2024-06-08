import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import ADminMenu from '../../components/layout/ADminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/product/getProduct");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <ADminMenu />
                </div>
                <div className="col-md-9 mt-3">
                    <h1 className="text-center">All Products List</h1>
                    <div className="row">
                        {products?.map((p) => (
                            <div key={p._id} className="col-lg-4 mb-4">
                                <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                    <div className="card">
                                        <img
                                            src={`http://localhost:8000/product/productPhoto/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default Products;
