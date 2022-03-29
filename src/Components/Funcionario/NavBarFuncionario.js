import { useNavigate } from "react-router-dom";
import "./NavBarFuncionario.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function NavBarFuncionario() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div className="menu">
      <button
        onClick={() => {
          navigate("/homeFuncionario");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/contacts");
        }}
      >
        Contacts
      </button>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Registar
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/registarEditora");
          }}
        >
          Adicionar Editora
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/registarAutor");
          }}
        >
          Adicionar Autor
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/registarLivro");
          }}
        >
          Adicionar Livro
        </MenuItem>
      </Menu>
      <button
        onClick={() => {
          navigate("/info/2");
        }}
      >
        Info
      </button>
    </div>
  );
}
