import { useEffect, useState } from "react";
import "../Components/Adicionar.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const API_URL = "http://localhost:8080";

export function Autor() {
  const [listaEditoras, setListasEditora] = useState([]);
  const [novaEditora, setNovaEditora] = useState({ nome: "", morada: "" });
  const [listaAutores, setListaAutores] = useState([]);
  const [novoAutor, setNovoAutor] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    editora: [""],
  });

  const [editoraSelecionada, setEditoraSelecionada] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setEditoraSelecionada(event.target.value);
  };

  //necessito do useEffect por causa do botao adicionar editora estar já com as editoras presentes
  useEffect(() => {
    GetAllEditoras();
  }, []);

  function FetchAutor() {
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
      })
      .catch((error) => {
        alert(error);
      });
  }

  function AdicionarAutor() {
    if (
      novoAutor.nome.trim().length !== 0 &&
      novoAutor.email.trim().length !== 0
    ) {
      fetch(API_URL + "/addAutor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoAutor),
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
          if (!parsedResponse.status) {
            alert(parsedResponse.message);

            return;
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
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
        <TextField
          id="filled-basic"
          label="Editora "
          variant="filled"
          type="text"
          value={editoraSelecionada}
        />

        <div>
          <Button
            id="basic-button-autor"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Adicionar editora
          </Button>
          <Button
            id="basic-button-autor"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={AdicionarAutor}
          >
            Adicionar Autor
          </Button>

          <br></br>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Editora</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editoraSelecionada}
              label="editora"
              onChange={handleChange}
            >
              {listaEditoras.map((element, index) => (
                <MenuItem key={index}>{index + element.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Menu>
      </Box>

      <section className="list-container">
        {listaAutores.map(function (element, index) {
          return (
            <div key={index} className="todo-card">
              <p className="todo-text" onClick={() => setNovoAutor(element)}>
                {"Nome: " + element.nome + ", Editora: " + element.editora}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
