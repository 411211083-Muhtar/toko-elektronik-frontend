import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ selectedProduct, onSave }) => {
  const [product, setProduct] = useState({
    product_id: '',
    name: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name: inputName, value, files } = e.target;
    if (inputName === 'image_url') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [inputName]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image_url', product.image);

    if (product.product_id) {
      await axios.put(`/api/products/${product.product_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    onSave();
    setProduct({ product_id: '', name: '', description: '', price: '', image: '' });
  };

  return (
    <div>
      <h2>{product.product_id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" className="form-control" value={product.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image_url" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
