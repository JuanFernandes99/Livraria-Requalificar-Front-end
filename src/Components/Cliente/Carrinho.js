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

const API_URL = "http://localhost:8080";
export function Carrinho(props) {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();
  const [livrosComprados, setLivrosComprados] = useState([]);
  let livroAux = [];
  const [novaCompra, setNovaCompra] = useState({
    cliente: {
      id: props.cliente.id,
    },
    livros: [],
  });

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

        {props.shoppingCart.map((element) => {
          return (
            <tr key={element.id}>
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
      <button
        onClick={() => {
          let livroAux = [];

          for (let value of props.shoppingCart) {
            livroAux.push({ id: value.item.id });
          }

          setNovaCompra({ ...novaCompra, livros: livroAux });

          console.log(novaCompra);
          console.log(livroAux);
          console.log(novaCompra.livros);
          AdicionarCompra();
          console.log(livroAux);
        }}
      >
        Comprar
      </button>
    </table>
  );
}
