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
import "./LoginFuncionario";
import "../Geral/Adicionar.css";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const theme = createTheme();
const API_URL = "http://localhost:8080";

export function RegistoFuncionario() {
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();
  const [novoFuncionario, setnovoFuncionario] = useState({
    nome: "",
    dataNascimento: "",
    palavraPasse: "",
  });

  function Registo() {
    fetch(API_URL + "/addFuncionario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(novoFuncionario),
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
        alert(
          parsedResponse.message +
            "!!, Tem de ingresar com o seguinte nickname único: " +
            parsedResponse.funcionario.nickName +
            "  e a sua respetiva palavra-passe"
        );

        navigate("/loginFuncionario");
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
            Registo Funcionario
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="nome"
              label="nome"
              id="nome"
              value={novoFuncionario.nome}
              onChange={(e) => {
                setnovoFuncionario({
                  ...novoFuncionario,
                  nome: e.target.value,
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
              value={novoFuncionario.palavraPasse}
              onChange={(e) => {
                setnovoFuncionario({
                  ...novoFuncionario,
                  palavraPasse: e.target.value,
                });
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data Nascimento"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setnovoFuncionario({
                    ...novoFuncionario,
                    dataNascimento: newValue,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              id="ButtonLogin"
              onClick={() => {
                Registo();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar conta
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
