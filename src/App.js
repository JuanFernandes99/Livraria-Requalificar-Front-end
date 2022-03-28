import { Contacts } from "./Components/Geral/Contacts";
import { Info } from "./Components/Geral/Info";
import { PaginaPrincipal } from "./Components/Geral/PaginaPrincipal";
import { BasicMenu } from "./Components/Geral/Menu";
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
  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <BasicMenu></BasicMenu>}
        <Routes>
          <Route
            path="/selecaoUtilizador"
            element={<SelecaoUtilizador></SelecaoUtilizador>}
          />
          <Route
            path="/registoCliente"
            element={<RegistoCliente></RegistoCliente>}
          />
          <Route
            path="/registoFuncionario"
            element={<RegistoFuncionario></RegistoFuncionario>}
          />

          <Route
            path="/loginFuncionario"
            element={
              <VerificaUser user={user}>
                <LoginFuncionario></LoginFuncionario>
              </VerificaUser>
            }
          />

          <Route
            path="/loginCliente"
            element={
              <VerificaUser user={user}>
                <LoginCliente></LoginCliente>
              </VerificaUser>
            }
          />
          <Route
            path="/home"
            element={
              <VerificaUser user={user}>
                <PaginaPrincipal></PaginaPrincipal>
              </VerificaUser>
            }
          />
          <Route
            path="/registarEditora"
            element={
              <VerificaUser user={user}>
                <Editora></Editora>
              </VerificaUser>
            }
          />
          <Route
            path="/registarAutor"
            element={
              <VerificaUser user={user}>
                <Autor></Autor>
              </VerificaUser>
            }
          />
          <Route
            path="/registarLivro"
            element={
              <VerificaUser user={user}>
                <NovoLivro></NovoLivro>
              </VerificaUser>
            }
          />
          <Route
            path="/contacts"
            element={
              <VerificaUser user={user}>
                <Contacts></Contacts>
              </VerificaUser>
            }
          />
          <Route
            path="/info/:id"
            element={
              <VerificaUser user={user}>
                <Info></Info>
              </VerificaUser>
            }
          />
          <Route
            path="/*"
            element={<LoginCliente doLogin={setUser}></LoginCliente>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Forma + correta em vez de passar o utilizador para cada componente
function VerificaUser({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
