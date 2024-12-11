import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ p: 2, textAlign: "center", backgroundColor: "grey.200" }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 Pet Shop
      </Typography>
    </Box>
  );
};

export default Footer;
