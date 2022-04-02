import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import livraryimage from "../Images/livraria.png";
import { useState } from "react";
import "./LoginCliente.css";

const theme = createTheme();
const API_URL = "http://localhost:8080";

export function LoginCliente(props) {
  const navigate = useNavigate();
  const [autenticacaoCliente, setAutenticacaoCliente] = useState({
    email: "",
    palavraPasse: "",
  });

  function autenticarCliente() {
    fetch(API_URL + "/autenticacaoCliente", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        email: "joaozinhoo@gmail.com",
        palavraPasse: "1234palavra",
      }),
      //body: JSON.stringify(autenticacaoCliente),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          return response.json().then((parsedResponse) => {
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          });
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        props.doLoginCliente(parsedResponse.cliente);

        navigate("/homeCliente");
        console.log(parsedResponse.cliente);
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
              type="text"
              name="email"
              label="Email"
              id="email"
              autoComplete="email"
              value={autenticacaoCliente.email}
              placeholder="Email"
              onChange={(e) => {
                setAutenticacaoCliente({
                  ...autenticacaoCliente,
                  email: e.target.value,
                });
              }}
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
              value={autenticacaoCliente.palavraPasse}
              onChange={(e) => {
                setAutenticacaoCliente({
                  ...autenticacaoCliente,
                  palavraPasse: e.target.value,
                });
              }}
            />
            <Button
              id="ButtonLogin"
              onClick={() => {
                autenticarCliente();
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
                navigate("/registoCliente");
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
