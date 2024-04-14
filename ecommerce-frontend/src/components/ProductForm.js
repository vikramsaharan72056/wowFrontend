import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';

function ProductForm({ productDetails, onSave }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',  
    available: true
  });

  useEffect(() => {
    if (productDetails) {
      setProduct({
        ...productDetails 
      });
    } else {
      setProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        available: true
      });
    }
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Rootfor");  
      data.append("cloud_name", "dp6gqhir8");  

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dp6gqhir8/image/upload", {
          method: "POST",
          body: data,
        });
        const result = await response.json();
        if (result.url) {
          setProduct(prev => ({ ...prev, image: result.url }));
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product, productDetails ? productDetails._id : null);
    navigate("/");
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6" style={{ marginBottom: '20px' }}>{productDetails ? 'Edit Product' : 'Add Product'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth required style={{ marginBottom: '20px' }}/>
        <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={4} required style={{ marginBottom: '20px' }}/>
        <TextField label="Price" name="price" value={product.price} onChange={handleChange} type="number" fullWidth required style={{ marginBottom: '20px' }}/>
        <TextField label="Image URL" name="image" value={product.image} onChange={handleChange} fullWidth style={{ marginBottom: '20px' }}/>
        <input type="file" onChange={handleImageChange} accept="image/*" style={{ marginBottom: '20px' }}/>
        <FormControlLabel control={<Checkbox checked={product.available} onChange={handleChange} name="available" />} label="Available" style={{ marginBottom: '20px' }}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Submit</Button>
          <Button type="button" variant="contained" color="secondary" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </form>
    </Paper>
  );
}

export default ProductForm;
