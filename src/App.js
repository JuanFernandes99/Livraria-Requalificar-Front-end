import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { PaginaPrincipal } from "./Components/Geral/PaginaPrincipal";
import { LoginFuncionario } from "./Components/Funcionario/LoginFuncionario";
import { RegistoFuncionario } from "./Components/Funcionario/RegistoFuncionario";
import { Editora } from "./Components/Funcionario/AdicionarEditora";
import { Autor } from "./Components/Funcionario/AdicionarAutor";
import { NovoLivro } from "./Components/Funcionario/AdicionarLivro";
import { NavBar } from "./Components/Geral/NavBar";
import { LoginCliente } from "./Components/Cliente/LoginCliente";
import { RegistoCliente } from "./Components/Cliente/RegistoCliente";
import { Perfil } from "./Components/Cliente/PerfilCliente";
import { Carrinho } from "./Components/Cliente/Carrinho";
import { SelecaoUtilizador } from "./Components/Geral/SelecaoUtilizador";
import { EstatisticasLivros } from "./Components/Funcionario/EstatisticasLivros";
import { LivroSelecionado } from "./Components/Geral/LivroSelecionado";
import { EstatisticasVendas } from "./Components/Funcionario/EstatisticasVendas";
import React, { useState } from "react";
function App() {
  const [user, setUser] = useState();
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
  // Limpar carrinho de compras
  function limparCarro() {
    setShoppingCart([]);
  }
  // Função para obter a info do livro
  function GetLivroInfo(item) {
    return setInfoLivro(item);
  }
  return (
    <div className="App">
      <BrowserRouter>
        {user && <NavBar user={user} doLogout={setUser}></NavBar>}

        <Routes>
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
            path="/registoFuncionario"
            element={<RegistoFuncionario></RegistoFuncionario>}
          />

          <Route
            path="/loginFuncionario"
            element={
              <LoginFuncionario doLoginFuncionario={setUser}></LoginFuncionario>
            }
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
            path="/home"
            element={
              <VerificaUser user={user}>
                <PaginaPrincipal GetLivroInfo={GetLivroInfo}></PaginaPrincipal>
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
            path="/registoCliente"
            element={<RegistoCliente></RegistoCliente>}
          />
          <Route
            path="/loginCliente"
            element={<LoginCliente doLoginCliente={setUser}></LoginCliente>}
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
                  limparCarro={limparCarro}
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
          <Route path="/" element={<SelecaoUtilizador></SelecaoUtilizador>} />
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
