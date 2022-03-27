import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import livraryimage from "./livraria.png";
import { useState } from "react";
import "./Login.css";

const theme = createTheme();
const API_URL = "http://localhost:8080";

export function Login(props) {
  const navigate = useNavigate();

  function autenticarCliente() {
    let cliente = { email: "joaozinho@gmail.com", palavraPasse: "1234palavra" };

    fetch(API_URL + "/autenticacaoCliente", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {

          return response.json().then(parsedResponse => { console.log(parsedResponse.message);throw new Error(parsedResponse.message)})
          
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        
       
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
        
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            <img id="image" src={livraryimage} alt="Logo" />
            <br></br>
            Iniciar sessão
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              input type="text" 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              
              autoComplete="current-password"
            />
            <Button
              id="ButtonLogin"
              onClick={() => {
                autenticarCliente();
             /*   props.doLogin("David");*/
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sessão
            </Button>
            <h5 id="welcomeQuestion">É a sua primeira vez na livraria?</h5>
            <br></br>
            <Button
              id="ButtonRegisto"
              onClick={() => {
                navigate("/home");
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar a conta da livraria
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
