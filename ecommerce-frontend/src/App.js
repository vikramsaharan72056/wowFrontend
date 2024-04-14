import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductSearch from './components/ProductSearch';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); 

  const fetchProducts = async (searchTerm = '') => {
    const url = searchTerm ?`http://localhost:5001/product/products/search?search=${encodeURIComponent(searchTerm)}`: `http://localhost:5001/product/products`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/product/products/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveProduct = async (product, id) => {
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `update/${id}` : '';
    try {
      const response = await fetch(`http://localhost:5001/product/products/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to save product');
      fetchProducts();
      setCurrentProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
 <div className="app-container">
     
        <div className="header">
          <Header />
        </div>
        
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <ProductSearch  onSearch={fetchProducts} />
                <ProductList products={products} onEdit={setCurrentProduct} onDelete={handleDeleteProduct} />
              </>
            } />
            <Route path="/add-product" element={
              <ProductForm productDetails={currentProduct} onSave={handleSaveProduct} />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
