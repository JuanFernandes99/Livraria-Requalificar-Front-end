import { Contacts } from "./Components/Geral/Contacts";
import { Info } from "./Components/Geral/Info";
import { PaginaPrincipal } from "./Components/Geral/PaginaPrincipal";
import { NavBarFuncionario } from "./Components/Funcionario/NavBarFuncionario";
import { NavBarCliente } from "./Components/Cliente/NavBarCliente";
import { SelecaoUtilizador } from "./Components/Geral/SelecaoUtilizador";
import { LoginCliente } from "./Components/Cliente/LoginCliente";
import { RegistoCliente } from "./Components/Cliente/RegistoCliente";
import { LoginFuncionario } from "./Components/Funcionario/LoginFuncionario";
import { RegistoFuncionario } from "./Components/Funcionario/RegistoFuncionario";
import { Editora } from "./Components/Funcionario/AdicionarEditora";
import { Autor } from "./Components/Funcionario/AdicionarAutor";
import { NovoLivro } from "./Components/Funcionario/AdicionarLivro";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [cliente, setCliente] = useState();
  const [funcionario, setFuncionario] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        {cliente && <NavBarCliente></NavBarCliente>}
        {funcionario && <NavBarFuncionario></NavBarFuncionario>}
        <Routes>
          <Route
            path="/registoCliente"
            element={<RegistoCliente></RegistoCliente>}
          />
          <Route
            path="/registoFuncionario"
            element={<RegistoFuncionario></RegistoFuncionario>}
          />
          <Route
            path="/loginCliente"
            element={<LoginCliente doLoginCliente={setCliente}></LoginCliente>}
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
                <PaginaPrincipal></PaginaPrincipal>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/contactsFuncionario"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <Contacts></Contacts>
              </VerificaFuncionario>
            }
          />
          <Route
            path="/infoFuncionario"
            element={
              <VerificaFuncionario funcionario={funcionario}>
                <Info></Info>
              </VerificaFuncionario>
            }
          />

          <Route
            path="/homeCliente"
            element={
              <VerificaCliente cliente={cliente}>
                <PaginaPrincipal></PaginaPrincipal>
              </VerificaCliente>
            }
          />
          <Route
            path="/contactsCliente"
            element={
              <VerificaCliente cliente={cliente}>
                <Contacts></Contacts>
              </VerificaCliente>
            }
          />
          <Route
            path="/infoCliente"
            element={
              <VerificaCliente cliente={cliente}>
                <Info></Info>
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
