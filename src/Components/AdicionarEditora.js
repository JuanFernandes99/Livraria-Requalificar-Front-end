import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:8080";

export function Editora() {
  const [novaEditora, setNovaEditora] = useState({ nome: "", morada: "" });
  const [listaEditoras, setListasEditora] = useState([]);

  useEffect(() => {
    GetEditoras();
  }, []);
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
        .then(async (response) => {
          if (response.status !== 200) {
            const parsedResponse = await response.json();
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          }
          console.log(response);
          return response.json();
        })
        .then((parsedResponse) => {
          GetEditoras();
          console.log(parsedResponse);
          alert(parsedResponse.message);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function GetEditoras() {
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
          throw new Error("Ocorreu um erro, nenhum Autor disponível");
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
    <>
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          margin="normal"
          required
        //falta o width
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
          margin="normal"
          required
          
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
      {listaEditoras.map((element) => (
        <p value={element} key={element.id}>
          {element.nome}
        </p>
      ))}
    </>
  );
}
