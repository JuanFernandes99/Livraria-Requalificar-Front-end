import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function LivroById(props) {
  const params = useParams();
  const [livro, setLivro] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("nao tem livro ");
      return;
    }
    setLivro(props.livroinfo);
  }, []);

  return livro !== {} ? (
    <div>
      <Button
        onClick={() => {
          console.log(livro);

          if (isLoading == true) {
            {
              props.addItem(livro);

              setIsLoading(false);
            }
          }
          props.shoppingCart.forEach((element) => {
            if (element.item.id === livro.id) {
              if (livro.quantidadeStock > element.quantity) {
                console.log(element.item.id);
                console.log(livro);
                props.addItem(livro);
                console.log(element);
              }
            }
          });
          console.log(isLoading);
          console.log(livro);
          console.log(props.shoppingCart);
        }}
      >
        Adicionar ao carrinho
      </Button>
      <h1>{livro.titulo}</h1>
    </div>
  ) : (
    <h1>adeus</h1>
  );
}
