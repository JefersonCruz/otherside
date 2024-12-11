import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../../assets/logo.svg"; // Importando o logo

const SidebarNav = () => {
  const drawerWidth = 240;
  const [openCadastros, setOpenCadastros] = useState(false);

  const handleClickCadastros = () => {
    setOpenCadastros(!openCadastros);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          height: 64,
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <img
          src={logo}
          alt="Logo Pet Shop"
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Typography variant="h6" noWrap>
          Pet Shop
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/posts">
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button onClick={handleClickCadastros}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Cadastros" />
          {openCadastros ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCadastros} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/admin/cadastros/categoria"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categoria" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin/cadastros/subcategoria"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="SubCategoria" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin/cadastros/produto"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Produto" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={Link} to="/admin/sobre">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Sobre" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarNav;
