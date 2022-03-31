import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import {
  AppBar,
  Badge,
  IconButton,
  Paper,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { ShoppingCart, Add, Remove } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box } from "@mui/system";

import Modal from "@mui/material/Modal";

const API_URL = "http://localhost:8080";

export function Carrinho(props) {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();
  const [livrosComprados, setLivrosComprados] = useState([]);
  let livroAux = [];
  const [novaCompra, setNovaCompra] = useState({
    cliente: {
      id: 1,
    },
    livros: [{}],
  });

  const [open, setOpen] = useState(false);
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

  function AdicionarCompra() {
    console.log(novaCompra);
    fetch(API_URL + "/addCompra", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(novaCompra),
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
        if (!parsedResponse.status) {
          alert(parsedResponse.message);

          return;
        }
        console.log(parsedResponse.compras);
        alert(parsedResponse.message);
      })
      .catch((error) => {
        alert(error);
      });
  }
  function calculateSum() {
    let total = 0.0;
    if (!props.shoppingCart) {
      return total;
    }
    for (let element of props.shoppingCart) {
      let value = element.quantity * element.item.preco;
      total += value;
    }

    return Math.round(total * 100) / 100;
  }

  return (
    <div>
      <h5> - Itens adicionados ao carrinho -</h5>
      <table>
        <tbody>
          <tr>
            <th>Livro</th>
            <th>Preço</th>
            <th>Quantity</th>
            <th>Aumentar/Diminuir</th>
            <th>Stock</th>
            <th>Total</th>
          </tr>
          {props.shoppingCart.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.item.titulo}</td>
                <td>{element.item.preco}</td>
                <td>{element.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      if (element.item.quantidadeStock > element.quantity) {
                        props.cartControls.increaseQuantity(element.item);
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (element.item.quantidadeStock >= element.quantity) {
                        props.cartControls.decreaseQuantity(element.item);
                      }
                    }}
                  >
                    -
                  </button>
                </td>

                <td>{element.item.quantidadeStock}</td>
                <td>Total = {calculateSum()}€</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button
        sx={{
          marginTop: 8,

          alignItems: "center",
        }}
        onClick={() => {
          handleOpen();
          let livroAux = [];

          for (let value of props.shoppingCart) {
            livroAux.push({ id: value.item.id });
          }

          setNovaCompra({ ...novaCompra, livros: livroAux });
          console.log(novaCompra);
        }}
      >
        Comprar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {livrosComprados.nome}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button
            onClick={() => {
              console.log(novaCompra);
              console.log(novaCompra.livros);
              AdicionarCompra();
            }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
