import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
export function SelecaoUtilizador() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        id="ButtonLogin"
        onClick={() => {
          navigate("/loginFuncionario");
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login Funcionario
      </Button>

      <Button
        id="ButtonLogin"
        onClick={() => {
          navigate("/loginCliente");
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login Cliente
      </Button>
    </div>
  );
}
