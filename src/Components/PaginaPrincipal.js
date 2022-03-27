import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import livraryimage from "./livraria.png";
const API_URL = "http://localhost:8080";

export function PaginaPrincipal() {
 // return <h1>Sem livros disponíveis</h1>;
  const [listaLivros, setListasLivros] = useState([]);


  useEffect(() => {
    fetchLivro();
  }, []);

  function fetchLivro() {
    fetch(API_URL + "/getAllLivros", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("There was an error finding livros");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse.livros);
        setListasLivros(parsedResponse.livros);
      })
      .catch((error) => {
        alert(error);
      });
  }


  return (
    <>
      <section className="list-container">
        {listaLivros.map(function (element, index) {
          return (
            <div key={index} className="todo-card">
             <img id="image" src={livraryimage} alt="Logo" />
             <br></br>
                { element.titulo} <br></br> {"" + element.preco + "$"}
              
            </div>
          );
        })}
      </section>


    </>
  );
}
