import { useEffect, useState } from "react";
import * as React from "react";

const API_URL = "http://localhost:8080";

export function EstatisticasLivros() {
  const [listaLivros, setListaLivros] = useState([]);
  const [filtros, setFiltros] = useState([]);
  useEffect(() => {
    getLivros();
  }, []);

  function getLivros() {
    fetch(API_URL + "/getAllLivros", {
      // mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          return response.json().then((parsedResponse) => {
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          });
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        setFiltros(parsedResponse.livros);
        setListaLivros(parsedResponse.livros);
        console.log(parsedResponse.livros);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function showQuantidadeCompradaCrescente() {
    var A = [...listaLivros].sort((a, b) => {
      return a.quantidadeComprada > b.quantidadeComprada ? 1 : -1;
    });
    setFiltros(A);
  }

  function showQuantidadeCompradaDecrescente() {
    var C = [...listaLivros].sort((a, b) => {
      return a.quantidadeComprada < b.quantidadeComprada ? 1 : -1;
    });
    setFiltros(C);
  }

  return (
    <div>
      <div id="btn-filtros">
        <button onClick={showQuantidadeCompradaCrescente}>
          Menos vendidos
        </button>
        <button onClick={showQuantidadeCompradaDecrescente}>
          Mais vendidos
        </button>
      </div>
      <p>Estatisticas do total das Livros</p>
      <table>
        <tbody>
          <tr>
            <th>Id do Livro</th>
            <th>Titulo do livro</th>
            <th>QuantidadeComprada</th>
          </tr>

          {filtros.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.titulo}</td>
              <td>{element.quantidadeComprada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
