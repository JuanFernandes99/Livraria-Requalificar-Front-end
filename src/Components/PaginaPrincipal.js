import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import livro from "../images/livro.jpeg";

const API_URL = "http://localhost:8080";

export function PaginaPrincipal() {
  // return <h1>Sem livros disponíveis</h1>;
  const [listaLivros, setListasLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    sinopse: "",
    dataLancamento: "",
    editora: "",
  });

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
    <div>
      {listaLivros.map((element, index) => (
        <Card key={index} sx={{ margin: 1.5, maxWidth: 250, maxHeight: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={livro}
              alt="narnia"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {element.titulo}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {element.preco + "€"}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <Button size="small" color="primary">
              Mais Informações
            </Button>
            <Button size="small" color="primary">
              Comprar
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
