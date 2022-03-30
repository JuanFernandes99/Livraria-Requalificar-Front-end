import { useState } from "react";
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

export function Carrinho(props) {
  const [anchor, setAnchor] = useState(null);

  function calculateSum() {
    let total = 0.0;
    if (!props.shoppingCart) {
      return total;
    }
    for (let element of props.shoppingCart) {
      let value = element.quantity * element.item.price;
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
          <th>Stock</th>
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
              </td>
              <td>{element.item.quantidadeStock}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
