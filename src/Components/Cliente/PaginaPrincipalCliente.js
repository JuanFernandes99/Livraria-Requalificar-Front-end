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
import livroimagem from "../Images/livro.jpeg";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function PaginaPrincipalCliente(props) {
  const [listaLivros, setListasLivros] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [sortType, setSortType] = useState("preco");
  const types = {
    preco: "preco",
    titulo: "titulo",
  };
  const navigate = useNavigate();

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        preco: "preco",
        titulo: "titulo",
      };
      const sortProperty = types[type];
      const sorted = [...listaLivros].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setFiltros(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

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
        setFiltros(
          parsedResponse.livros.sort((a, b) => (a.preco < b.preco ? 1 : -1))
        );
        setListasLivros(parsedResponse.livros);
      })
      .catch((error) => {
        alert(error);
      });
  }
  var A = listaLivros.sort((a, b) => (a.preco < b.preco ? 1 : -1));
  var B = listaLivros.sort((a, b) => (a.titulo > b.titulo ? 1 : -1));

  function showA() {
    setFiltros(A);
  }

  function showB() {
    setFiltros(B);
  }

  return (
    <div>
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="titulo">titulo</option>
        <option value="preco">preco</option>
      </select>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup titulo="spacing" aria-label="spacing" row>
                  {listaLivros.map((element) => (
                    <Card
                      onClick={() => {
                        props.GetLivroInfo(element);
                        navigate("/livroID/" + element.id);
                      }}
                      key={element.id}
                      sx={{ margin: 1.5, maxWidth: 180, maxHeight: 340 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image={livroimagem}
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
                            {"Preço: " + element.dataLancamento + "€"}
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
    </div>
  );
}
