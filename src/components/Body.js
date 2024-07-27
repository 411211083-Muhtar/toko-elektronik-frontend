import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import './Body.css';

const Body = () => {
  const navigate = useNavigate(); // initialize useNavigate

  const handleShopNowClick = () => {
    navigate('/products');
  };

  return (
    <main className="main-background">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Our Shop</h1>
          <p className="lead">Find the best electronics here!</p>
          <hr className="my-4" />
          <p>Explore our wide range of products.</p>
          <button className="btn btn-primary btn-lg" onClick={handleShopNowClick}>
            Shop Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Body;
