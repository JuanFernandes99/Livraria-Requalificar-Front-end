import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { PaginaPrincipal } from "./Components/Geral/PaginaPrincipal";
import { Registo } from "./Components/Geral/Registo";
import { NavBar } from "./Components/Geral/NavBar";
import { Login } from "./Components/Geral/Login";
import { LivroSelecionado } from "./Components/Geral/LivroSelecionado";
import { SelecaoUtilizador } from "./Components/Geral/SelecaoUtilizador";
import { Editora } from "./Components/Funcionario/AdicionarEditora";
import { Autor } from "./Components/Funcionario/AdicionarAutor";
import { NovoLivro } from "./Components/Funcionario/AdicionarLivro";
import { EstatisticasLivros } from "./Components/Funcionario/EstatisticasLivros";
import { EstatisticasVendas } from "./Components/Funcionario/EstatisticasVendas";
import { Perfil } from "./Components/Cliente/PerfilCliente";
import { Carrinho } from "./Components/Cliente/Carrinho";

function App() {
  const [user, setUser] = useState();
  const [cliente, isCliente] = useState();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [infoLivro, setInfoLivro] = useState();

  function addQuantity(item) {
    let oldShoppingCart = shoppingCart;

    //verificar se um item já existe
    if (oldShoppingCart.some((e) => e.item.id === item.id)) {
      oldShoppingCart = oldShoppingCart.map((e) => {
        console.log(e.item.quantidadeStock);
        console.log(item.quantity);
        if (e.item.id === item.id) {
          e.quantity++;
        }
        return e;
      });
    } else {
      let myItem = {
        quantity: 1,
        item: item,
      };
      oldShoppingCart = [myItem, ...oldShoppingCart];
    }

    setShoppingCart(oldShoppingCart);
  }

  function removeQuanitty(item) {
    let oldShoppingCart = shoppingCart;

    //verificar se um item já existe
    if (oldShoppingCart.some((e) => e.item.id === item.id)) {
      oldShoppingCart = oldShoppingCart.map((e) => {
        if (e.item.id === item.id) {
          e.quantity--;
        }
        return e;
      });

      oldShoppingCart = oldShoppingCart.filter((e) => e.quantity > 0);

      setShoppingCart(oldShoppingCart);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        {user && <NavBar user={user} doLogout={setUser}></NavBar>}
        <Routes>
          <Route
            path="/registo"
            element={<Registo iscliente={cliente}></Registo>}
          />

          <Route
            path="/login"
            element={<Login iscliente={cliente} doLogin={setUser}></Login>}
          />

          <Route
            path="/registarEditora"
            element={
              <VerificaFuncionario user={user}>
                <Editora></Editora>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/registarAutor"
            element={
              <VerificaFuncionario user={user}>
                <Autor></Autor>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/registarLivro"
            element={
              <VerificaFuncionario user={user}>
                <NovoLivro></NovoLivro>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/estatisticasVendas"
            element={
              <VerificaFuncionario user={user}>
                <EstatisticasVendas></EstatisticasVendas>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/estatisticasLivros"
            element={
              <VerificaFuncionario user={user}>
                <EstatisticasLivros></EstatisticasLivros>
              </VerificaFuncionario>
            }
          />

          <Route
            path="/perfilCliente/:id"
            element={
              <VerificaCliente user={user}>
                <Perfil cliente={user}></Perfil>
              </VerificaCliente>
            }
          />

          <Route
            path="/carrinho"
            element={
              <VerificaCliente user={user}>
                <Carrinho
                  setShoppingCart={setShoppingCart}
                  cliente={user}
                  shoppingCart={shoppingCart}
                  cartControls={{
                    increaseQuantity: addQuantity,
                    decreaseQuantity: removeQuanitty,
                  }}
                ></Carrinho>
              </VerificaCliente>
            }
          />
          <Route
            path="/home"
            element={
              <VerificaUser user={user}>
                <PaginaPrincipal setInfoLivro={setInfoLivro}></PaginaPrincipal>
              </VerificaUser>
            }
          />

          <Route
            path="/livroSelecionado/:id"
            element={
              <VerificaUser user={user}>
                <LivroSelecionado
                  user={user}
                  livroinfo={infoLivro}
                  shoppingCart={shoppingCart}
                  addItem={addQuantity}
                ></LivroSelecionado>
              </VerificaUser>
            }
          />

          <Route
            path="/"
            element={
              <SelecaoUtilizador iscliente={isCliente}></SelecaoUtilizador>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Forma + correta em vez de passar o utilizador para cada componente
function VerificaCliente({ user, children }) {
  if (!user || user.type !== "cliente") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

function VerificaUser({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

function VerificaFuncionario({ user, children }) {
  if (!user || user.type !== "funcionario") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
