import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../assets/logo.svg";

const Sobre = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 8, textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </Box>
      <Typography variant="h6" component="p" gutterBottom>
        Sobre Pet Shop
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <IconButton color="primary" aria-label="email">
          <EmailIcon />
        </IconButton>
        <Typography variant="body1" component="span">
          <Link href="mailto:contato@petshop.com" color="inherit">
            contato@petshop.com
          </Link>
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <IconButton color="primary" aria-label="phone">
          <PhoneIcon />
        </IconButton>
        <Typography variant="body1" component="span">
          <Link href="tel:+5511999999999" color="inherit">
            +55 (11) 99999-9999
          </Link>
        </Typography>
      </Box>
      <Typography variant="h6" component="p" gutterBottom>
        Siga-nos nas Redes Sociais
      </Typography>
      <Box>
        <IconButton
          color="primary"
          component={Link}
          href="https://www.facebook.com/seupetshop"
          aria-label="facebook"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={Link}
          href="https://www.twitter.com/seupetshop"
          aria-label="twitter"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={Link}
          href="https://www.instagram.com/seupetshop"
          aria-label="instagram"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Sobre;
