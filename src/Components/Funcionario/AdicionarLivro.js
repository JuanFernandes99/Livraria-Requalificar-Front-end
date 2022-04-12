import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
const API_URL = "http://localhost:8080";

export function NovoLivro() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null);
  const [listaEditoras, setListaEditoras] = useState([]);
  const [listaLivros, setListaLivros] = useState([]);
  const [listaAutores, setListaAutores] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    sinopse: "",
    edicao: "",
    imagem: "",
    dataLancamento: "",
    preco: 0.0,
    quantidadeStock: 0,
    numeroPaginas: 0,
    isbn: "",
    editora: {
      id: "",
    },
    autores: [],
  });

  useEffect(() => {
    GetAllAutores();
    GetAllEditoras();
    getAllLivros();
  }, []);

  function GetAllEditoras() {
    fetch(API_URL + "/getAllEditoras", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro, nenhuma editora disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListaEditoras(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getAllLivros() {
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
          throw new Error("Ocorreu um erro, nenhuma editora disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListaLivros(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function GetAllAutores() {
    fetch(API_URL + "/getAllAutores", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro, nenhum Autor disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListaAutores(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertBase64(file);
    let aux = base64;
    console.log(base64);
    console.log(aux);
    setNovoLivro({ ...novoLivro, imagem: aux });
    console.log(aux);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  function AdicionarLivro() {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append(novoLivro, imagedata);
    fetch(API_URL + "/addLivro", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(novoLivro),
    })
      .then(async (response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          const parsedResponse = await response.json();
          console.log(parsedResponse.message);
          throw new Error(parsedResponse.message);
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        if (!parsedResponse.status) {
          alert(parsedResponse.message);

          return;
        }
        alert(parsedResponse.message);
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          margin="normal"
          required
          id="titulo"
          label="Titulo"
          variant="filled"
          type="text"
          value={novoLivro.titulo}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, titulo: e.target.value });
          }}
        />
        <br></br>
        <TextField
          margin="normal"
          required
          id="sinopse"
          label="Sinopse"
          variant="filled"
          type="text"
          value={novoLivro.sinopse}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, sinopse: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="Edição"
          required
          variant="filled"
          type="text"
          value={novoLivro.edicao}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, edicao: e.target.value });
          }}
        />

        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data Lançamento"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setNovoLivro({
                ...novoLivro,
                dataLancamento: newValue,
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br></br>
        <TextField
          id="filled-basic"
          label="Preço "
          required
          variant="filled"
          type="text"
          value={novoLivro.preco}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, preco: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="Quantidade de stock "
          required
          variant="filled"
          type="text"
          value={novoLivro.quantidadeStock}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, quantidadeStock: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="Número de páginas "
          required
          variant="filled"
          type="text"
          value={novoLivro.numeroPaginas}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, numeroPaginas: e.target.value });
          }}
        />
        <br></br>
        <TextField
          id="filled-basic"
          label="ISBN "
          required
          variant="filled"
          type="text"
          value={novoLivro.isbn}
          onChange={(e) => {
            setNovoLivro({ ...novoLivro, isbn: e.target.value });
          }}
        />
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Editora</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Editora"
            value={novoLivro.editora}
            onChange={(e) => {
              setNovoLivro({ ...novoLivro, editora: e.target.value });
            }}
          >
            {listaEditoras.map((element) => (
              <MenuItem value={element} key={element.id}>
                {element.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Autores</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Autor(es)"
            multiple
            value={novoLivro.autores}
            onChange={(e) => {
              setNovoLivro({ ...novoLivro, autores: e.target.value });
            }}
          >
            {listaAutores.map((element) => (
              <MenuItem value={element} key={element.id}>
                {element.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div>
        <button className="btn-Livro" onClick={AdicionarLivro}>
          Adicionar Livro
        </button>
      </div>
      <div>
        {listaLivros.map(function teste(element) {
          console.log(element.autores);
          return (
            <p key={element.id}>
              {element.titulo +
                " editora: " +
                element.editora.nome +
                " autores: " +
                element.autores.map((element) => element.nome)}
            </p>
          );
        })}
      </div>
    </>
  );
}
