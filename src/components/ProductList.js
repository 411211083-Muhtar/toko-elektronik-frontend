import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data);
  };

  const handleDelete = async (product_id) => {
    await axios.delete(`/api/products/${product_id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td><img src={product.image_url} alt={product.name} style={{width: '100px'}} /></td>
              <td>
                <button className="btn btn-primary" onClick={() => onEdit(product)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
