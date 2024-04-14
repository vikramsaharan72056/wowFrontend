import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function ProductSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    };

    return (
        <div style={{ margin: '20px',marginLeft:"25%" }}>
            <TextField
                label="Search Products"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
                Search
            </Button>
        </div>
    );
}

export default ProductSearch;
