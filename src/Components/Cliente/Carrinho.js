import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import "../Geral/Adicionar.css";
import { useEffect, useState } from "react";
const API_URL = "http://localhost:8080";

export function Carrinho(props) {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();
  const [livrosComprados, setLivrosComprados] = useState([]);
  const [vouchers, setVoucher] = useState([]);
  let livroAux = [];
  const [novaCompra, setNovaCompra] = useState({
    novaCompra: "",
    cliente: {
      id: 1,
    },
    livros: [],
    voucher: [],
  });
  useEffect(() => {
    fetchVouchers();
  }, []);
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
        props.limparCarro();
        fetchLivro();
        console.log(parsedResponse.compras);
        alert(parsedResponse.message);
      })
      .catch((error) => {
        alert(error);
      });
  }
  function fetchLivro() {
    fetch(API_URL + "/getAllLivros", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("There was an error finding livros");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse.livros);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function fetchVouchers() {
    fetch(API_URL + "/getVouchersCliente/" + props.cliente.id, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("There was an error finding livros");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setVoucher(parsedResponse);
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
          </tr>
          {props.shoppingCart.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.item.titulo}</td>
                <td>{element.item.preco}</td>
                <td>{element.quantity}</td>
                <td>
                  <button
                    id="btn-carrinho"
                    onClick={() => {
                      if (element.item.quantidadeStock > element.quantity) {
                        props.cartControls.increaseQuantity(element.item);
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    id="btn-carrinho"
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
              </tr>
            );
          })}
        </tbody>
      </table>
      <p id="valorTotal">Total = {calculateSum()}€</p>
      <Button
        id="botaoCompra"
        sx={{
          marginTop: 8,
          alignItems: "center",
        }}
        onClick={() => {
          handleOpen();
          let livroAux = [];

          for (let value of props.shoppingCart) {
            livroAux.push({
              id: value.item.id,
              quantidadeStock: value.quantity,
            });
          }
          setNovaCompra({
            ...novaCompra,
            valorCompra: calculateSum(),
            livros: livroAux,
          });
        }}
      >
        Comprar
      </Button>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Editora"
        value={novaCompra.voucher}
        onChange={(e) => {
          setNovaCompra({ ...novaCompra, voucher: e.target.value });
        }}
      >
        {vouchers.map((element) => (
          <MenuItem id="menucupoes" value={element} key={element.id}>
            {"ID: " +
              element.id +
              ", Valor do cupao:" +
              element.valorVoucher * 100 +
              "%"}
          </MenuItem>
        ))}
      </Select>
      <Button
        id="botaoCupao"
        sx={{
          marginTop: 8,
          alignItems: "center",
        }}
        onClick={() => {
          setNovaCompra({ ...novaCompra, voucher: null });
        }}
      >
        Retirar cupao
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
            Deseja efetuar a compra?
          </Typography>
          <Button
            onClick={() => {
              console.log(novaCompra);
              console.log(novaCompra.livros);
              AdicionarCompra();
              handleClose();
            }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
