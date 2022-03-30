import * as React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import livroimagem from "../Images/livro.jpeg";
import { Carrinho } from "../Cliente/Carrinho";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function PaginaPrincipal(props) {
  const [listaLivros, setListasLivros] = useState([]);
  const [livro, setLivro] = useState({});
  const [livroSelecionado, setLivroSelecionado] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const navigate = useNavigate();

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
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            {props.livros &&
              props.livros.map((e) => {
                return (
                  <Grid key={e.titulo} item>
                    <FormControl component="fieldset">
                      <RadioGroup
                        titulo="spacing"
                        aria-label="spacing"
                        value={livro}
                        row
                      >
                        {listaLivros.map((element) => (
                          <Card
                            onClick={() => {
                              setLivroSelecionado(element);
                              console.log(element);
                            }}
                            key={element.id}
                            sx={{ margin: 1.5, maxWidth: 250, maxHeight: 300 }}
                          >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={element.imagem}
                                alt="livro"
                              />

                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {element.titulo}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {element.preco + "€"}
                                </Typography>
                              </CardContent>
                            </CardActionArea>

                            <CardActions>
                              <button
                                onClick={() => {
                                  navigate("/LivroID/:id");
                                }}
                              >
                                +
                              </button>
                            </CardActions>
                          </Card>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                );
              })}
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
