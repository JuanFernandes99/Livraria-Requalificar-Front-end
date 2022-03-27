import { useEffect, useState } from "react";

//const API_URL = "http://localhost:8080";

export function PaginaPrincipal() {
  return <h1>Sem livros disponíveis</h1>;
  /*const [listaLivros, setListasLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({ titulo: "", sinopse: "" });
  const [livroSelecionado, setLivroSelecionado] = useState({});

  useEffect(() => {
    fetchLivro();
  }, []);

  function fetchLivro() {
    fetch(API_URL + "/getAllLivros", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("There was an error finding livros");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListasLivros(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addLivro() {
    if (
      novoLivro.titulo.trim().length !== 0 &&
      novoLivro.sinopse.trim().length !== 0
    ) {
      fetch(API_URL + "/addLivro", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("There was an error finding livros");
          }

          return response.json();
        })
        .then((parsedResponse) => {
          if (!parsedResponse.status) {
            alert(parsedResponse.message);

            return;
          }

          fetchLivro();
        })
        .catch((error) => {
          alert(error);
        });
    }
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
                {"titulo: " + element.titulo + ", sinopse: " + element.sinopse}
              </p>
            </div>
          );
        })}
      </section>

      <div>
        <p>titulo do livro</p>
        <input
          type="text"
          value={novoLivro.titulo}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, titulo: e.target.value });
          }}
        />
        <p>Sinopse:</p>
        <input
          type="text"
          value={novoLivro.sinopse}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, sinopse: e.target.value });
          }}
        />
        <br></br>
        <button onClick={addLivro}>Adicionar Livro</button>
      </div>
    </>
  );*/
}
