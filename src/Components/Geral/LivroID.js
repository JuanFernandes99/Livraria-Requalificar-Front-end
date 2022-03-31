import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import livroimg from "../Images/livro.jpeg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

export function LivroById(props) {
  const params = useParams();
  const [livro, setLivro] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [autores, setListaAutores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("nao tem livro ");
      return;
    }
    setLivro(props.livroinfo);
    setListaAutores(props.livroinfo.autores);
  }, []);
  console.log(livro);
  console.log(props.livroinfo.autores);
  return livro !== {} ? (
    <div>
      <Grid sx={{ flexGrow: 1, marginTop: 5 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center">
            <Card sx={{ maxWidth: 400, margin: 1 }}>
              <CardActionArea
                onClick={() => {
                  navigate("/loginCliente");
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={livroimg}
                  alt="clienteIMG"
                />
              </CardActionArea>
              <br></br>
              <Typography> Informações gerais</Typography>

              <p>{"Título: " + livro.titulo}</p>
              <div></div>
              <p>{"da " + props.livroinfo.editora.nome}</p>
              <p>{"ISBN: " + livro.isbn}</p>
              <p>{"Edição: " + livro.edicao}</p>
              <p>{"Data de Lançamento: " + livro.dataLancamento}</p>
              <p>{"Número de Páginas: " + livro.numeroPaginas}</p>
              <p>{"Cópias Disponíveis: " + livro.quantidadeStock}</p>
            </Card>

            <Card sx={{ width: 600, margin: 1 }}>
              <CardActionArea>
                <CardMedia />
              </CardActionArea>
              <p id="textoSobre"> - Sobre o livro -</p>
              <p> autores:</p>

              <p>
                {props.livroinfo.autores.map(function teste(element, index) {
                  console.log(props.livroinfo.autores);
                  return <p key={index}>{element.nome}</p>;
                })}
              </p>
              <p>{"Sinopse: " + livro.sinopse}</p>
              <br></br>
              <Button
                onClick={() => {
                  console.log(livro);
                  if (livro.quantidadeStock <= 0) {
                    alert("sem stock");
                  }
                  if (isLoading == true && livro.quantidadeStock > 0) {
                    props.addItem(livro);

                    setIsLoading(false);
                  }
                  props.shoppingCart.forEach((element) => {
                    if (element.item.id === livro.id) {
                      if (livro.quantidadeStock > element.quantity) {
                        props.addItem(livro);
                      }
                    }
                  });
                }}
              >
                Adicionar ao carrinho
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Typography variant="h1">Livro não encontrado</Typography>
  );
}
