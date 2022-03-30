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
const API_URL = "http://localhost:8080";

export function Perfil(props) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      alert("nao tem cliente ");
      return;
    }
    setCliente(props.cliente);
  }, []);
  return cliente !== {} ? (
    <div>
      <Grid sx={{ flexGrow: 1, marginTop: 5 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center">
            <Card sx={{ maxWidth: 400, margin: 1 }}>
              <CardActionArea
                onClick={() => {
                  navigate("/loginCliente");
                }}
              ></CardActionArea>

              <Typography> Dados do cliente</Typography>

              <p>{"Nome: " + cliente.nome}</p>
              <p>{"Morada: " + cliente.morada}</p>
              <p>{"Data de nascimento: " + cliente.dataNascimento}</p>
              <p>{"Email " + cliente.email}</p>
              <Button onClick={() => {}}>Alterar Dados</Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Typography variant="h1">Livro não encontrado</Typography>
  );
}
