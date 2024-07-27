import React from 'react';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  // Contoh data produk
  const products = [
    { product_id: 1, name: 'Product 1' },
    { product_id: 2, name: 'Product 2' },
    // Tambahkan data produk lainnya
  ];

  return (
    <div className="container">
      <h1>Admin Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>
                <Link to={`/admin/product/edit/${product.product_id}`} className="btn btn-primary">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;
