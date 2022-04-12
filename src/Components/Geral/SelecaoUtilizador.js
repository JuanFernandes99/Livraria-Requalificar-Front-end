import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import clienteImg from "../Images/cliente.jpeg";
import funcionarioImg from "../Images/funcionario.jpeg";
import "../Geral/Adicionar.css";

export function SelecaoUtilizador(props) {
  const [spacing] = React.useState(2);
  const navigate = useNavigate();
  return (
    <div id="background">
      <Grid sx={{ flexGrow: 1, marginTop: 20 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center" spacing={spacing}>
            <Card sx={{ maxWidth: 345, margin: 2 }}>
              <CardActionArea
                onClick={() => {
                  props.iscliente(true);
                  navigate("/login");
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={clienteImg}
                  alt="clienteIMG"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Sou Cliente da Livraria
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345, margin: 2 }}>
              <CardActionArea
                onClick={() => {
                  props.iscliente(false);
                  navigate("/login");
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={funcionarioImg}
                  alt="funcionarioIMG"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Funcionário da Livraria
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
