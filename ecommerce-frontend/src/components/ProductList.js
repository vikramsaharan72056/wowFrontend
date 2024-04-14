import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';

function ProductList({ products, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
  
        <Paper className='content-container'>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card elevation={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    style={{ objectFit: 'contain' }}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="h6">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        onEdit(product);
                        navigate("/add-product");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
     
   
  );
}

export default ProductList;
