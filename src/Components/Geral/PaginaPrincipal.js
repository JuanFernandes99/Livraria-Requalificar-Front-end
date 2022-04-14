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
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PropagateLoader from "react-spinners/PropagateLoader";
const API_URL = "http://localhost:8080";

export function PaginaPrincipal(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [listaLivros, setListasLivros] = useState([]);
  const [listaEditoras, setListaEditoras] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listaAutores, setListaAutores] = useState([]);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Position loading indicator in the center of the screen
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    GetAllEditoras();
    GetAllAutores();
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
      .then(async (response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          const parsedResponse = await response.json();
          console.log(parsedResponse.message);
          throw new Error(parsedResponse.message);
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse.livros);
        setFiltros(parsedResponse.livros);
        setListasLivros(parsedResponse.livros);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
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
          throw new Error("Ocorreu um erro, nenhuma editora disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListaEditoras(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function GetAllAutores() {
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
        setListaAutores(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function showPrecoCrescente() {
    var A = [...listaLivros].sort((a, b) => {
      return a.preco > b.preco ? 1 : -1;
    });
    setFiltros(A);
  }

  function showData() {
    var B = [...listaLivros].sort((a, b) => {
      return a.dataLancamento > b.dataLancamento ? 1 : -1;
    });
    setFiltros(B);
  }
  function showPrecoDecrescente() {
    var C = [...listaLivros].sort((a, b) => {
      return a.preco < b.preco ? 1 : -1;
    });
    setFiltros(C);
  }
  function showEditora() {
    var D = [...listaLivros].sort((a, b) => {
      return a.editora.nome > b.editora.nome ? 1 : -1;
    });
    setFiltros(D);
  }

  function showAutores() {
    var E = [...listaLivros];
    E.sort((a, b) => {
      return a.autores[0].nome > b.autores[0].nome ? 1 : -1;
    });
    setFiltros(E);
    console.log(filtros);
  }

  function showLivroPorEditora(idEditora) {
    var D = [...listaLivros].filter(
      (editora) => editora.editora.id === idEditora
    );
    setFiltros(D);
    console.log(D);
  }

  function showLivroPorAutor(idAutor) {
    var D = [...listaLivros].filter((livro) =>
      livro.autores.some((autor) => autor.id === idAutor)
    );

    setFiltros(D);
    console.log(D);
  }

  return (
    <div>
      {loading ? (
        <div style={style}>
          <PropagateLoader
            color={"#123abc"}
            loading={loading}
            size={15}
            flex={1}
          />
        </div>
      ) : (
        <>
          <div id="btn-filtros">
            <button onClick={showPrecoCrescente}>Preço crescente</button>
            <button onClick={showPrecoDecrescente}>Preco decrescente</button>
            <button onClick={showData}>Por data de Lançamento</button>
            <button onClick={showEditora}>Por Editora</button>
            <button onClick={showAutores}>Por autores</button>
            <button onClick={showLivroPorEditora}>showLivroPorEditora</button>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Editora</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Editora"
                onChange={(e) => {
                  showLivroPorEditora(e.target.value.id);
                }}
              >
                {listaEditoras.map((element) => (
                  <MenuItem value={element} key={element.id}>
                    {element.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Autor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Autor"
                onChange={(e) => {
                  showLivroPorAutor(e.target.value.id);
                }}
              >
                {listaAutores.map((element) => (
                  <MenuItem value={element} key={element.id}>
                    {element.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Grid id="backgroundPP" item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container>
                <Grid item>
                  <FormControl component="fieldset">
                    <RadioGroup titulo="spacing" aria-label="spacing" row>
                      {filtros.map((element) => (
                        <Card
                          className="livros"
                          onClick={() => {
                            props.setInfoLivro(element);
                            navigate("/livroSelecionado/" + element.id);
                          }}
                          key={element.id}
                          sx={{ margin: 1.5, maxWidth: 150, maxHeight: 300 }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="180"
                              image={element.imagem}
                              alt="livro"
                            />

                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {element.titulo}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {"Preço: " + element.preco + "€"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {"Editora: " + element.editora.nome}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {"Autores: " +
                                  element.autores.map(
                                    (element) => element.nome
                                  )}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}
    </div>
  );
}
