import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoff = () => {
    logout();
    handleMenuClose();
  };

  const handleSettings = () => {
    // Lógica para abrir configurações
    console.log("Settings accessed");
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Painel Administrativo
        </Typography>
        <IconButton
          aria-label="opções adicionais"
          aria-controls="header-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="header-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogoff}>Logoff</MenuItem>
          <MenuItem onClick={handleSettings}>Configurações</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
