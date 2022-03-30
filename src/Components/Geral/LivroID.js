import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function LivroById(props) {
  const params = useParams();
  const [livro, setLivro] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("nao tem livro ");
      return;
    }
    setLivro(props.livros.find((e) => e.id == params.id));
  }, []);

  return livro !== {} ? (
    <div>
      <h1>hei</h1>
    </div>
  ) : (
    <h1>adeus</h1>
  );
}
