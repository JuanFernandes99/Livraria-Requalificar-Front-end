import { useEffect, useState } from "react";
import * as React from "react";

const API_URL = "http://localhost:8080";

export function Estatisticas() {
  const [listaCompras, setListaCompras] = useState([]);

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
        console.log(parsedResponse.compras);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      {listaCompras.map(function teste(element) {
        console.log(listaCompras);
        return <p key={element.id}>{element.valorCompra + " editora: "}</p>;
      })}
    </div>
  );
}
