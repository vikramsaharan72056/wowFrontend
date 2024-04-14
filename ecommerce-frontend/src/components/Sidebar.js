import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar() {
  return (
    <Drawer 
      variant="permanent" 
      sx={{ 
        width: '20%', 
        flexShrink: 0, 
        '& .MuiDrawer-paper': { 
          width: '20%', 
          boxSizing: 'border-box',
          paddingTop: '75px',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/" sx={{ marginBottom: 2 }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/add-product" sx={{ marginBottom: 2 }}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button component={Link} to="/categories" sx={{ marginBottom: 2 }}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/settings" sx={{ marginTop: 2, marginBottom: 2 }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/logout" sx={{ marginBottom: 2 }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
