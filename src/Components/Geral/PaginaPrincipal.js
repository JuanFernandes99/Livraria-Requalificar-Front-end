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
import PropagateLoader from "react-spinners/PropagateLoader";
const API_URL = "http://localhost:8080";

export function PaginaPrincipal(props) {
  const [listaLivros, setListasLivros] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Position loading indicator in the center of the screen
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
      return a.autores.nome > b.autores.nome ? 1 : -1;
    });
    setFiltros(E);
    console.log(filtros);
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
          </div>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container>
                <Grid item>
                  <FormControl component="fieldset">
                    <RadioGroup titulo="spacing" aria-label="spacing" row>
                      {filtros.map((element) => (
                        <Card
                          onClick={() => {
                            props.GetLivroInfo(element);
                            navigate("/livroSelecionado/" + element.id);
                          }}
                          key={element.id}
                          sx={{ margin: 1.5, maxWidth: 180, maxHeight: 340 }}
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
