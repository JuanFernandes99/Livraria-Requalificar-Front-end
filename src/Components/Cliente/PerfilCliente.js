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
  const [cliente, setCliente] = useState({});
  const params = useParams();
  useEffect(() => {
    setCliente(props.cliente);
    fetchCliente();
  }, []);
  const [atualizaCliente, setAtualizaCliente] = useState({
    palavraPasse: "",
    email: "",
    morada: "",
  });
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

  function updateCliente() {
    let updatedCliente = {
      id: cliente.id,
      palavraPasse: atualizaCliente.palavraPasse,
      email: atualizaCliente.email,
      morada: atualizaCliente.morada,
    };
    fetch(API_URL + "/updateCliente", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCliente),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          return response.json().then((parsedResponse) => {
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          });
        }

        console.log(response);

        return response.json();
      })
      .then((res) => {
        fetchCliente();
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  }
  function fetchCliente() {
    fetch(API_URL + "/getClienteById/" + props.cliente.id, {
      // mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        setCliente(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return cliente !== {} ? (
    <div>
      <Grid sx={{ flexGrow: 1, marginTop: 5 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center">
            <Card sx={{ width: 600, height: 400, margin: 1 }}>
              <br></br>
              <Typography> Dados Pessoais</Typography>

              <p>{"Nome: " + cliente.nome}</p>
              <p>{"Morada: " + cliente.morada}</p>
              <p>{"Data de nascimento: " + cliente.dataNascimento}</p>
              <p>{"Email: " + cliente.email}</p>
              <br></br>

              
              <Button onClick={handleOpen}>Alterar dados</Button>
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
            name="morada"
            label="morada"
            type="text"
            id="morada"
            value={atualizaCliente.morada}
            onChange={(e) => {
              setAtualizaCliente({
                ...atualizaCliente,
                morada: e.target.value,
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
            value={atualizaCliente.email}
            onChange={(e) => {
              setAtualizaCliente({
                ...atualizaCliente,
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
            value={atualizaCliente.palavraPasse}
            onChange={(e) => {
              setAtualizaCliente({
                ...atualizaCliente,
                palavraPasse: e.target.value,
              });
            }}
          />
          <Button
            id="ButtonUpdateCliente"
            onClick={() => {
              updateCliente();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            update Cliente
          </Button>
        </Box>
      </Modal>
    </div>
  ) : (
    <Typography variant="h1">Livro não encontrado</Typography>
  );
}
