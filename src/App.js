import { Navigate } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { PaginaPrincipalCliente } from "./Components/Cliente/PaginaPrincipalCliente";
import { PaginaPrincipalFun } from "./Components/Funcionario/PaginaPrincipalFun";
import { NavBarFuncionario } from "./Components/Funcionario/NavBarFuncionario";
import { LoginFuncionario } from "./Components/Funcionario/LoginFuncionario";
import { RegistoFuncionario } from "./Components/Funcionario/RegistoFuncionario";
import { Editora } from "./Components/Funcionario/AdicionarEditora";
import { Autor } from "./Components/Funcionario/AdicionarAutor";
import { NovoLivro } from "./Components/Funcionario/AdicionarLivro";
import { NavBarCliente } from "./Components/Cliente/NavBarCliente";
import { LoginCliente } from "./Components/Cliente/LoginCliente";
import { RegistoCliente } from "./Components/Cliente/RegistoCliente";
import { Perfil } from "./Components/Cliente/PerfilCliente";
import { Carrinho } from "./Components/Cliente/Carrinho";
import { SelecaoUtilizador } from "./Components/Geral/SelecaoUtilizador";
import { LivroSelecionadoCliente } from "./Components/Cliente/LivroIDCliente";
import { Estatisticas } from "./Components/Funcionario/Estatisticas";
import { LivroSelecionadoFuncionario } from "./Components/Funcionario/LivroIDFuncionario";

function App() {
  const [cliente, setCliente] = useState();
  const [funcionario, setFuncionario] = useState();
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
        {cliente && (
          <NavBarCliente
            cliente={cliente}
            doLogoutCliente={setCliente}
          ></NavBarCliente>
        )}
        {funcionario && (
          <NavBarFuncionario
            doLogoutFuncionario={setFuncionario}
          ></NavBarFuncionario>
        )}
        <Routes>
          <Route path="/estatisticas" element={<Estatisticas></Estatisticas>} />
          <Route
            path="/registoFuncionario"
            element={<RegistoFuncionario></RegistoFuncionario>}
          />

          <Route
            path="/loginFuncionario"
            element={
              <LoginFuncionario
                doLoginFuncionario={setFuncionario}
              ></LoginFuncionario>
            }
          />

          <Route
            path="/registarEditora"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <Editora></Editora>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/registarAutor"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <Autor></Autor>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/registarLivro"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <NovoLivro></NovoLivro>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/homeFuncionario"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <PaginaPrincipalFun
                  GetLivroInfo={GetLivroInfo}
                ></PaginaPrincipalFun>
              </VerificaFuncionario>
            }
          />

          <Route
            path="/livroFun/:id"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <LivroSelecionadoFuncionario
                  livroinfo={infoLivro}
                ></LivroSelecionadoFuncionario>
              </VerificaFuncionario>
            }
          />

          <Route
            path="/registoCliente"
            element={<RegistoCliente></RegistoCliente>}
          />
          <Route
            path="/loginCliente"
            element={<LoginCliente doLoginCliente={setCliente}></LoginCliente>}
          />
          <Route
            path="/livroID/:id"
            element={
              <VerificaCliente cliente={cliente}>
                <LivroSelecionadoCliente
                  livroinfo={infoLivro}
                  shoppingCart={shoppingCart}
                  addItem={addQuantity}
                ></LivroSelecionadoCliente>
              </VerificaCliente>
            }
          />

          <Route
            path="/homeCliente"
            element={
              <VerificaCliente cliente={cliente}>
                <PaginaPrincipalCliente
                  GetLivroInfo={GetLivroInfo}
                ></PaginaPrincipalCliente>
              </VerificaCliente>
            }
          />

          <Route
            path="/perfilCliente/:id"
            element={
              <VerificaCliente cliente={cliente}>
                <Perfil cliente={cliente}></Perfil>
              </VerificaCliente>
            }
          />

          <Route
            path="/carrinho"
            element={
              <VerificaCliente cliente={cliente}>
                <Carrinho
                  limparCarro={limparCarro}
                  cliente={cliente}
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
function VerificaCliente({ cliente, children }) {
  if (!cliente) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

function VerificaFuncionario({ funcionario, children }) {
  if (!funcionario) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
