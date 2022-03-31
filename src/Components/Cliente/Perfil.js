import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import livroimg from "../Images/livro.jpeg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import { CardActionArea } from "@mui/material";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
const API_URL = "http://localhost:8080";

export function Perfil(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
              <Button onClick={handleOpen}>Alterar Dados do cliente</Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            name="nome"
            label="nome"
            id="nome"
            value={novoCliente.nome}
            onChange={(e) => {
              setnovoCliente({ ...novoCliente, nome: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="morada"
            label="morada"
            type="text"
            id="morada"
            value={novoCliente.morada}
            onChange={(e) => {
              setnovoCliente({ ...novoCliente, morada: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="dataNascimento"
            label="dataNascimento"
            type="text"
            id="dataNascimento"
            value={novoCliente.dataNascimento}
            onChange={(e) => {
              setnovoCliente({
                ...novoCliente,
                dataNascimento: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="email"
            type="text"
            id="email"
            value={novoCliente.email}
            onChange={(e) => {
              setnovoCliente({
                ...novoCliente,
                email: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={novoCliente.palavraPasse}
            onChange={(e) => {
              setnovoCliente({
                ...novoCliente,
                palavraPasse: e.target.value,
              });
            }}
          />
          <Button
            id="ButtonLogin"
            onClick={() => {
              Registo();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar conta
          </Button>
        </Box>
      </Modal>
    </div>
  ) : (
    <Typography variant="h1">Livro não encontrado</Typography>
  );
}
