import { useNavigate } from "react-router-dom";
import "./NavBarCliente.css";
import * as React from "react";

export function NavBarCliente(props) {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <button
        onClick={() => {
          navigate("/homeCliente");
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
      <button
        onClick={() => {
          navigate("/info");
        }}
      >
        Info
      </button>
      <button
        onClick={() => {
          navigate("/carrinho");
        }}
      >
        Carrinho
      </button>
      <button
        onClick={() => {
          navigate("/perfilCliente/" + props.cliente.id);
        }}
      >
        Perfil
      </button>
      <button
        onClick={() => {
          props.doLogoutCliente("");
        }}
      >
        Logout
      </button>
    </div>
  );
}
