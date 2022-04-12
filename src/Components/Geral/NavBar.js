import { useNavigate } from "react-router-dom";
import * as React from "react";
import "./NavBar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export function NavBar(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };

  return (
    <div className="menu">
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      {props.user.type === "cliente" ? (
        <>
          <button
            onClick={() => {
              navigate("/carrinho");
            }}
          >
            Carrinho
          </button>
          <button
            onClick={() => {
              navigate("/perfilCliente/" + props.user.id);
            }}
          >
            Perfil
          </button>
        </>
      ) : (
        <>
          <button
            id="basic-button"
            aria-controls={open2 ? "basic-menu-estatisticas" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            onClick={handleClick2}
          >
            Estatisticas
          </button>
          <Menu
            id="basic-menu-estatisticas"
            anchorEl={anchorE2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/estatisticasVendas");
              }}
            >
              Estatisticas das vendas
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/estatisticasLivros");
              }}
            >
              Estatisticas dos livros
            </MenuItem>
          </Menu>
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Registar
          </button>
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
        </>
      )}

      <button
        onClick={() => {
          props.doLogout("");
        }}
      >
        Logout
      </button>
    </div>
  );
}
