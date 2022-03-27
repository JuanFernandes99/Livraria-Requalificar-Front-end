import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:8080";

export function Editora() {
  const [listaEditoras, setListasEditora] = useState([]);
  const [novaEditora, setNovaEditora] = useState({ nome: "", morada: "" });
  //const [editoraSelecionada, setEditoraSelecionada] = useState({});

  useEffect(() => {
    //fetchEditora();
  }, []);

  function FetchEditora() {
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
          throw new Error("Ocorreu um erro, nenhuma Editora disponível");
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

  function AdicionarEditora() {
    if (
      novaEditora.nome.trim().length !== 0 &&
      novaEditora.morada.trim().length !== 0
    ) {
      fetch(API_URL + "/addEditora", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novaEditora),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("There was an error finding pessoas");
          }

          return response.json();
        })
        .then((parsedResponse) => {
          if (!parsedResponse.status) {
            alert(parsedResponse.message);

            return;
          }

          FetchEditora();
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
          label="Nome da Editora"
          variant="filled"
          type="text"
          value={novaEditora.nome}
          onChange={(e) => {
            setNovaEditora({ ...novaEditora, nome: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="Morada da Editora"
          variant="filled"
          type="text"
          value={novaEditora.morada}
          onChange={(e) => {
            setNovaEditora({ ...novaEditora, morada: e.target.value });
          }}
        />
      </Box>
      <div>
        <button className="btn-editora" onClick={AdicionarEditora}>
          Adicionar Editora
        </button>
      </div>

      <section className="list-container">
        {listaEditoras.map(function (element, index) {
          return (
            <div key={index} className="todo-card">
              <p className="todo-text" onClick={() => setNovaEditora(element)}>
                {"Nome: " + element.nome + ", morada: " + element.morada}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
