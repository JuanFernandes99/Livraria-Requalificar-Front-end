import { useEffect, useState } from "react";
import * as React from "react";

const API_URL = "http://localhost:8080";

export function Estatisticas() {
  const [listaCompras, setListaCompras] = useState([]);
  const [filtros, setFiltros] = useState([]);
  useEffect(() => {
    getCompras();
  }, []);

  function getCompras() {
    fetch(API_URL + "/getAllCompras", {
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
        setListaCompras(parsedResponse.compras);
        setFiltros(parsedResponse.compras);
        console.log(parsedResponse.compras);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function showValorCompraCrescente() {
    var A = [...listaCompras].sort((a, b) => {
      return a.valorCompra > b.valorCompra ? 1 : -1;
    });
    setFiltros(A);
  }

  function showValorCompraDecrescente() {
    var C = [...listaCompras].sort((a, b) => {
      return a.valorCompra < b.valorCompra ? 1 : -1;
    });
    setFiltros(C);
  }

  return (
    <div>
      <section>
        <div id="btn-filtros">
          <button onClick={showValorCompraCrescente}>
            valorCompra crescente
          </button>
          <button onClick={showValorCompraDecrescente}>
            valorCompra decrescente
          </button>
        </div>
        <p>Estatisticas do total das compras</p>
        <table>
          <tbody>
            <tr>
              <th>Id da compra</th>
              <th>Valor da compra</th>
              <th>Nome do cliente</th>
            </tr>

            {filtros.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.valorCompra}</td>
                <td>{element.cliente.nome}</td>
                {console.log(filtros)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
