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
import "./Login.css";
const theme = createTheme();
const API_URL = "http://localhost:8080";

export function Login(props) {
  const navigate = useNavigate();
  const [autenticacaoFuncionario, setAutenticacaoFuncionario] = useState({
    nickName: "",
    palavraPasse: "",
  });
  const [autenticacaoCliente, setAutenticacaoCliente] = useState({
    email: "",
    palavraPasse: "",
  });

  function autenticarFuncionario() {
    fetch(API_URL + "/autenticacaoFuncionario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(autenticacaoFuncionario),
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
        props.doLogin(parsedResponse.funcionario);
        navigate("/home");
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  function autenticarCliente() {
    fetch(API_URL + "/autenticacaoCliente", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(autenticacaoCliente),
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
        props.doLogin(parsedResponse.cliente);
        navigate("/home");
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
            {props.iscliente ? (
              <>
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
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="nickName"
                  label="Nick name"
                  id="nickName"
                  autoComplete="nickName"
                  value={autenticacaoFuncionario.nickName}
                  placeholder="Nickname"
                  onChange={(e) => {
                    setAutenticacaoFuncionario({
                      ...autenticacaoFuncionario,
                      nickName: e.target.value,
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
                  value={autenticacaoFuncionario.palavraPasse}
                  onChange={(e) => {
                    setAutenticacaoFuncionario({
                      ...autenticacaoFuncionario,
                      palavraPasse: e.target.value,
                    });
                  }}
                />
              </>
            )}

            <Button
              id="ButtonLogin"
              onClick={() => {
                props.iscliente ? autenticarCliente() : autenticarFuncionario();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sessão
            </Button>
            <h5 id="welcomeQuestion">É a sua primeira vez na livraria ?</h5>
            <br></br>
            <Button
              id="ButtonRegisto"
              onClick={() => {
                navigate("/registo");
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar conta da livraria
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
