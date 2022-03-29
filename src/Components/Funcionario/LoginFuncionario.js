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
import "./LoginFuncionario.css";

const theme = createTheme();
const API_URL = "http://localhost:8080";

export function LoginFuncionario(props) {
  const navigate = useNavigate();
  const [autenticacaoFuncionario, setAutenticacaoFuncionario] = useState({
    nickName: "",
    palavraPasse: "",
  });

  function autenticarFuncionario() {
    fetch(API_URL + "/autenticacaoFuncionario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        nickName: "Frederica1",
        palavraPasse: "345passe",
      }),
      //body: JSON.stringify(autenticacaoFuncionario),
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
        props.doLoginFuncionario(parsedResponse.funcionario);
        navigate("/homeFuncionario");
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Button
        id="ButtonLogin"
        onClick={() => {
          navigate("/loginCliente");
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login Cliente
      </Button>
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
            <Button
              id="ButtonLogin"
              onClick={() => {
                autenticarFuncionario();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sessão
            </Button>
            <h5 id="welcomeQuestion">
              É a sua primeira vez na livraria (Funcionario)?
            </h5>
            <br></br>
            <Button
              id="ButtonRegisto"
              onClick={() => {
                navigate("/registoFuncionario");
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar a conta da livraria (Funcionario)
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
