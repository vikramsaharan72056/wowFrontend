import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" style={{ width: '100%' }}> 
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My E-commerce Store
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;