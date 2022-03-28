import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contacts } from "./Components/Geral/Contacts";
import { Info } from "./Components/Geral/Info";
import { PaginaPrincipal } from "./Components/Geral/PaginaPrincipal";
import { BasicMenu } from "./Components/Geral/Menu";
import { LoginCliente } from "./Components/Cliente/LoginCliente";
import { LoginFuncionario } from "./Components/Funcionario/LoginFuncionario";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Editora } from "./Components/Funcionario/AdicionarEditora";
import { Autor } from "./Components/Funcionario/AdicionarAutor";
import { RegistoCliente } from "./Components/Cliente/RegistoCliente";
import { RegistoFuncionario } from "./Components/Funcionario/RegistoFuncionario";
import { NovoLivro } from "./Components/Funcionario/AdicionarLivro";
import { SelecaoUtilizador } from "./Components/Geral/SelecaoUtilizador";
import "./App.css";

const API_URL = "http://localhost:8080";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <BasicMenu></BasicMenu>}
        <Routes>
          <Route
            path="/selecaoUtilizador"
            element={
              <VerificaUser user={user}>
                <PaginaPrincipal></PaginaPrincipal>
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
            path="/registoCliente"
            element={<RegistoCliente></RegistoCliente>}
          />
          <Route
            path="/registoFuncionario"
            element={<RegistoFuncionario></RegistoFuncionario>}
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
                <Contacts /*user={user}*/></Contacts>
              </VerificaUser>
            }
          />
          <Route
            path="/loginFuncionario"
            element={<LoginFuncionario /*user={user}*/></LoginFuncionario>}
          />

          <Route
            path="/loginCliente"
            element={<LoginCliente /*user={user}*/></LoginCliente>}
          />
          <Route
            path="/info/:id"
            element={
              <VerificaUser user={user}>
                <Info user={user}></Info>
              </VerificaUser>
            }
          />
          <Route
            path="/*"
            element={<SelecaoUtilizador doLogin={setUser}></SelecaoUtilizador>}
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
