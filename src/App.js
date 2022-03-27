import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contacts } from "./Components/Contacts";
import { Info } from "./Components/Info";
import { PaginaPrincipal } from "./Components/PaginaPrincipal";
import { BasicMenu } from "./Components/Menu";
import { Login } from "./Components/Login";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { Editora } from "./Components/AdicionarEditora";
import { Autor } from "./Components/AdicionarAutor";
import { Registo } from "./Components/Registo";
//import { NovoLivro} from "./Components/AdicionarLivro";
const API_URL = "http://localhost:8080";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <BasicMenu></BasicMenu>}
        <Routes>
          <Route
            path="/home"
            element={
              <VerificaUser user={user}>
                <PaginaPrincipal></PaginaPrincipal>
              </VerificaUser>
            }
          />
          <Route path="/registo" element={<Registo></Registo>} />
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
            path="/info/:id"
            element={
              <VerificaUser user={user}>
                <Info user={user}></Info>
              </VerificaUser>
            }
          />
          <Route path="/*" element={<Login doLogin={setUser}></Login>} />
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
