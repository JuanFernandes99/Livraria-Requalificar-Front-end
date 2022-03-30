import { useState } from "react";
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
    <AppBar sx={{ minHeight: "4em" }} position="relative">
      <Toolbar variant="dense" sx={{ minHeight: "4em" }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          VeggieShop
        </Typography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="shopping-cart"
          onClick={(e) => {
            setAnchor(e.currentTarget);
          }}
        >
          <Badge
            color="secondary"
            badgeContent={props.shoppingCart.length}
            showZero
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Popover
          id={"simple-popover"}
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => {
            setAnchor(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              width: "20em",
              height: "20em",
              overflowY: "scroll",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {props.shoppingCart.map((e, i) => {
              return (
                <Paper
                  key={i}
                  elevation={2}
                  sx={{
                    width: "18em",
                    height: "5em",
                    padding: "0.125em",
                    boxSizing: "border-box",
                    marginY: "0.250em",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography variant="p">Name: {e.item.name}</Typography>
                    <Typography variant="p">Quantity: {e.quantity}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <IconButton
                      color="success"
                      onClick={() => {
                        props.cartControls.increaseQuantity(e.item);
                      }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        props.cartControls.decreaseQuantity(e.item);
                      }}
                    >
                      <Remove />
                    </IconButton>
                  </Box>
                </Paper>
              );
            })}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Typography>Total = {calculateSum()}€ </Typography>
              <PaymentIcon
                onClick={() => {
                  alert("Pagar");
                }}
              />
            </Box>
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
