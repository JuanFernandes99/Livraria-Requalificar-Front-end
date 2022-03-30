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
import Carrinho from "../Cliente/Carrinho";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const API_URL = "http://localhost:8080";

export function PaginaPrincipal(props) {
  const [listaLivros, setListasLivros] = useState([]);
  const [livro, setLivro] = useState({});
  const [livroSelecionado, setLivroSelecionado] = useState({});
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 10,
    p: 4,
  };

  const handleChange = (event) => {
    setLivro(Number(event.target.value));
  };

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
  function LivroId() {
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
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={livro}
                  onChange={handleChange}
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
                      <CardActionArea onClick={handleOpen}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={element.imagem}
                          alt="livro"
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
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Informação adicional sobre o livro
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              {livroSelecionado.titulo}
                              <br></br>

                              <Button
                                onClick={() => {
                                  if (isLoading === true) {
                                    {
                                      props.addItem(livroSelecionado);

                                      console.log(element);
                                      setIsLoading(false);
                                      console.log(isLoading);
                                    }
                                  } else {
                                    props.shoppingCart.forEach((element) => {
                                      if (
                                        element.item.id === livroSelecionado.id
                                      ) {
                                        if (
                                          livroSelecionado.quantidadeStock >
                                          element.quantity
                                        ) {
                                          props.addItem(livroSelecionado);
                                          console.log(element);
                                        }
                                      }
                                    });
                                  }

                                  console.log(isLoading);
                                  console.log(livroSelecionado);
                                  console.log(element.item);
                                  console.log(props.shoppingCart);
                                }}
                              >
                                Adicionar ao carrinho
                              </Button>
                            </Typography>
                          </Box>
                        </Modal>
                      </CardActions>
                    </Card>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
