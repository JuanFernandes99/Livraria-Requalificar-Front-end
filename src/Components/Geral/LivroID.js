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
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("nao tem livro ");
      return;
    }
    setLivro(props.livroinfo);
  }, []);

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

              <p>{"da " + livro.editora}</p>
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
              <p>{"de " + livro.autores}</p>
              <p>{livro.sinopse}</p>
              <br></br>
              <Button
                onClick={() => {
                  console.log(livro);

                  if (isLoading == true) {
                    props.addItem(livro);

                    setIsLoading(false);
                  }
                  props.shoppingCart.forEach((element) => {
                    if (element.item.id === livro.id) {
                      if (livro.quantidadeStock > element.quantity) {
                        console.log(element.item.id);
                        console.log(livro);
                        props.addItem(livro);
                        console.log(element);
                      }
                    }
                  });
                  console.log(isLoading);
                  console.log(livro);
                  console.log(props.shoppingCart);
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
