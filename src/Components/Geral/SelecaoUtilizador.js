import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea } from "@mui/material";
import clienteImg from "../Images/cliente.jpeg";
import funcionarioImg from "../Images/funcionario.png";
import "../Geral/Adicionar.css";

export function SelecaoUtilizador() {
  const [spacing, setSpacing] = React.useState(2);
  const navigate = useNavigate();
  return (
    <div>
      <Grid sx={{ flexGrow: 1, marginTop: 20 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center" spacing={spacing}>
            <Card sx={{ maxWidth: 345, margin: 2 }}>
              <CardActionArea
                onClick={() => {
                  navigate("/loginCliente");
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={clienteImg}
                  alt="clienteIMG"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Sou Cliente da Livraria
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345, margin: 2 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={funcionarioImg}
                  alt="funcionarioIMG"
                />
                <CardContent
                  onClick={() => {
                    navigate("/loginCliente");
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
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
