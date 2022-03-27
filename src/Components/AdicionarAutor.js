import { useEffect, useState } from "react";
import "../Components/Adicionar.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //const [editoraSelecionada, setEditoraSelecionada] = useState({});
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
          if (response.status !== 200) {
            throw new Error("There was an error finding autores");
          }

          return response.json();
        })
        .then((parsedResponse) => {
          if (!parsedResponse.status) {
            alert(parsedResponse.message);

            return;
          }

          FetchAutor();
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
          {listaEditoras.map((element, index) => (
            <MenuItem>{index + "." + element.nome}</MenuItem>
          ))}
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
