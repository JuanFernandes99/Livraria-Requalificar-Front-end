import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:8080";

export function Editora() {
  const [listaEditoras, setListasEditora] = useState([]);
  const [novaEditora, setNovaEditora] = useState({ nome: "", morada: "" });
  //const [editoraSelecionada, setEditoraSelecionada] = useState({});
  /*
  useEffect(() => {
    //fetchEditora();
  }, []);
*/

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
            return response.json().then((parsedResponse) => {
              console.log(parsedResponse.message);
              throw new Error(parsedResponse.message);
            });
          }
          console.log(response);
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          alert(parsedResponse.message)
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
    </>
  );
}
