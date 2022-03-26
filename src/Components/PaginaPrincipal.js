import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export function PaginaPrincipal() {
  const [listaLivros, setListaLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({ titulo: "" });
  const [livroSelecionado, setLivroSelecionado] = useState({});

  useEffect(() => {
    FetchLivro();
  }, []);

  function FetchLivro() {
    fetch(API_URL + "/getAllLivros", {
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding livros");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        setListaLivros(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <section className="list-container">
        {listaLivros.map(function (element, index) {
          return (
            <div key={index} className="todo-card">
              <p
                className="todo-text"
                onClick={() => setLivroSelecionado(element)}
              >
                {"Nome: " + element.titulo}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
