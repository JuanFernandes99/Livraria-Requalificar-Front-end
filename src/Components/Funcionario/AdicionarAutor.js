import { useEffect, useState } from "react";
import "../Geral/Adicionar.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const API_URL = "http://localhost:8080";

export function Autor() {
  const [listaEditoras, setListasEditora] = useState([]);
  const [listaAutores, setListasAutor] = useState([]);
  const [novoAutor, setNovoAutor] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    editora: {
      id: "",
    },
  });

  useEffect(() => {
    GetAllEditoras();
    GetAllAutores();
  }, []);

  function AdicionarAutor() {
    fetch(API_URL + "/addAutor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(novoAutor),
    })
      .then(async (response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          const parsedResponse = await response.json();
          console.log(parsedResponse.message);
          throw new Error(parsedResponse.message);
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        alert(parsedResponse.message);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function GetAllEditoras() {
    fetch(API_URL + "/getAllEditoras", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro, nenhuma Editora disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListasEditora(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function GetAllAutores() {
    fetch(API_URL + "/getAllAutores", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro, nenhum Autor disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListasAutor(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <Box
        className="formularioAutor"
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Nome do Autor"
          variant="filled"
          type="text"
          value={novoAutor.nome}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, nome: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="Email "
          variant="filled"
          type="text"
          value={novoAutor.email}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, email: e.target.value });
          }}
        />
        <TextField
          id="filled-basic"
          label="Data de Nascimento "
          variant="filled"
          type="text"
          value={novoAutor.dataNascimento}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, dataNascimento: e.target.value });
          }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Editora</InputLabel>
          <Select
            labelId="editora"
            id="filled-basic"
            label="Editora"
            value={novoAutor.editora}
            onChange={(e) => {
              setNovoAutor({ ...novoAutor, editora: e.target.value });
            }}
          >
            {listaEditoras.map((element) => (
              <MenuItem value={element} key={element.id}>
                {element.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button onClick={AdicionarAutor}>Adicionar Autor</Button>
      <br></br>

      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data Nascimento</th>
            <th>Editora</th>
          </tr>

          {listaAutores.map((element) => (
            <tr key={element.id}>
              <td>{element.nome}</td>
              <td>{element.email}</td>
              <td>{element.dataNascimento}</td>
              <td>{element.editora.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
