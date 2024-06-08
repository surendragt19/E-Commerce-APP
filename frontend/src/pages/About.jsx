import React from 'react';
import Layout from '../components/layout/Layout';
import '../style/aboutCSS.css';
import {Link} from 'react-router-dom'

const About = () => {
 
  return (
    <Layout>
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/f1.png"
              className="d-block w-100 img1"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/f2.png"
              className="d-block w-100 img1"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/f4.png"
              className="d-block w-100 img1"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-2">
        <div className="row">
          <h1 className="text-center p-3"><u>ABOUT US</u></h1>
          <div className="col-md-6 mb-4">
            <img
              src="images/a1.jpg"
              className="img-fluid rounded img2"
              alt="About Us"
            />
          </div>
          <div className="col-md-6">
            <h2>Welcome to Khatu Shyam Trades</h2>
            <p>
              We are committed to providing the best electronic products and
              services. Our shop offers a wide range of electronics from top
              brands, ensuring high quality and the latest technology.
            </p>
            <p>
              Our mission is to enhance your shopping experience by offering
              personalized customer service, great deals, and a user-friendly
              website.
            </p>
            <p>
              Whether you are looking for the latest smartphone, a high-end
              laptop, or home appliances, we have it all. Visit our store or
              browse our website to find the perfect product for you.
            </p>
            <button className='btn btn-dark mt-1 mb-2 btn1'><Link to='/' style={{textDecoration:'none',color:'white'}}>SHOP NOW</Link></button>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default About;
