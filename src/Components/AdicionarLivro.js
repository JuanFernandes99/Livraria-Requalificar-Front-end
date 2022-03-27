import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:8080";

export function NovoLivro() {
    const navigate = useNavigate();
  const [listaAutores, setListaAutores] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    sinopse: "",
    dataNascimento: "",
    editora: "",
  });

  function getEditoras() {
    fetch(
      API_URL +
        "/getAllEditoras" /*defino aqui o @pathvariable exemple getPessoasbyid --- "/getPessoa" + id*/,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
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

  function getAutores() {
    fetch(
      API_URL +
        "/getAllAutores" /*defino aqui o @pathvariable exemple getPessoasbyid --- "/getPessoa" + id*/,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
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

  function AdicionarLivro() {
    if (
      novoLivro.nome.trim().length !== 0 &&
      novoLivro.email.trim().length !== 0
    ) {
      fetch(API_URL + "/addLivro", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoLivro),
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

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "20em" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Titulo do livro"
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
          label="Email "
          variant="filled"
          type="text"
          value={novoAutor.dataNascimento}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, dataNascimento: e.target.value });
          }}
        />
        <TextField
          id="filled-basic"
          label="Email "
          variant="filled"
          type="text"
          value={novoAutor.editora}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, editora: e.target.value });
          }}
        />
      </Box>
      <div>
        <button className="btn-Livro" onClick={AdicionarAutor}>
          Adicionar Livro
        </button>
      </div>

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
    </>
  );
}
