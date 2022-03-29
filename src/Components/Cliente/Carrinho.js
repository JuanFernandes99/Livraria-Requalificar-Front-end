import { Navigate, useParams } from "react-router-dom";

import * as React from "react";

export function Carrinho(props) {
  console.log(props);
  console.log(props.livros);
  return <div>{props.livros}</div>;
}
