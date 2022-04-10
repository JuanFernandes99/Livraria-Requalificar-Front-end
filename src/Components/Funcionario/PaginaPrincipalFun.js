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
import "../Geral/Adicionar.css";

const API_URL = "http://localhost:8080";

export function PaginaPrincipalFun(props) {
  const [listaLivros, setListasLivros] = useState([]);
  const [filtros, setFiltros] = useState([]);
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
  return (
    <div>
      <>
        <button onClick={showPrecoCrescente}>Preço crescente</button>
        <button onClick={showPrecoDecrescente}>Preco decrescente</button>
        <button onClick={showData}>Por data de Lançamento</button>
        <button onClick={showEditora}>Por Editora</button>
      </>

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
                        navigate("/livroFun/" + element.id);
                      }}
                      key={element.id}
                      sx={{ margin: 1.5, maxWidth: 180, maxHeight: 340 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          // image={element.imagem}
                          height="200px"
                          alt="livro"
                        />

                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {element.titulo}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {"Preço: " + element.preco + "€"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {"Editora: " + element.editora.nome}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {"Autores: " +
                              element.autores.map((element) => element.nome)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                  {filtros.map((element) => (
                    <img src={element.imagem} height="200px" />
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
