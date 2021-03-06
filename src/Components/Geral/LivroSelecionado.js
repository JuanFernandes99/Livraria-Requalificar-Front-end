import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as React from "react";

const API_URL = "http://localhost:8080";

export function LivroSelecionado(props) {
  const [value, setValue] = React.useState(null);
  const [livro, setLivro] = useState({});
  const [listaEditoras, setListaEditoras] = useState([]);
  const [listaAutores, setListaAutores] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    id: props.livroinfo.id,
    titulo: "",
    isbn: "",
    sinopse: "",
    edicao: "",
    preco: 0,
    quantidadeStock: 0,
    numeroPaginas: 0,
    dataLancamento: "",
    editora: {},
    autores: [],
  });
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleClose = () => setOpen(false);
  const params = useParams();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    console.log(props.user);
    GetAllEditoras();
    GetAllAutores();
    fetchLivro();

    if (!params.id) {
      alert("nao tem livro ");
      return;
    }
    setLivro(props.livroinfo);
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
          throw new Error("Ocorreu um erro, nenhum Autor dispon??vel");
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
          throw new Error("Ocorreu um erro, nenhum Autor dispon??vel");
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
  function fetchLivro() {
    fetch(API_URL + "/getLivroById/" + props.livroinfo.id, {
      // mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos s??o feitos com sucesso normalmente quando o status ?? entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setNovoLivro(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function UpdateLivro() {
    let livroAtualizado = {
      id: props.livroinfo.id,
      titulo: novoLivro.titulo,
      isbn: novoLivro.isbn,
      sinopse: novoLivro.sinopse,
      edicao: novoLivro.edicao,
      preco: novoLivro.preco,
      quantidadeStock: novoLivro.quantidadeStock,
      numeroPaginas: novoLivro.numeroPaginas,
      dataLancamento: novoLivro.dataLancamento,
      editora: novoLivro.editora,
      autores: novoLivro.autores,
    };

    fetch(API_URL + "/updateLivro", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(livroAtualizado),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos s??o feitos com sucesso normalmente quando o status ?? entre 200 e 299
        if (response.status !== 200) {
          return response.json().then((parsedResponse) => {
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          });
        }

        console.log(response);

        return response.json();
      })
      .then((res) => {
        fetchLivro();
        setLivro(res.livro);
        alert(res.message);
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return livro !== {} ? (
    <div>
      <Grid sx={{ flexGrow: 1, marginTop: 5 }} container spacing={2}>
        <Grid container>
          <Grid container justifyContent="center">
            <Card
              sx={{
                "& > :not(style)": { m: 1, width: "80%" },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={novoLivro.imagem}
                  alt="clienteIMG"
                />
              </CardActionArea>
              <br></br>
              <Typography> Informa????es gerais</Typography>

              <p>{"T??tulo: " + novoLivro.titulo}</p>
              <p>{"da editora: " + props.livroinfo.editora.nome}</p>
              <p> {"Pre??o: " + novoLivro.preco + "???"}</p>
              <p>{"ISBN: " + novoLivro.isbn}</p>
              <p>{"Edi????o: " + novoLivro.edicao}</p>

              <p>
                {"Data de Lan??amento: " +
                  novoLivro.dataLancamento.split("-").reverse().join("/")}
              </p>
              <p>{"N??mero de P??ginas: " + novoLivro.numeroPaginas}</p>
              <p>{"C??pias Dispon??veis: " + novoLivro.quantidadeStock}</p>
              <p>{"C??pias Vendidas: " + novoLivro.quantidadeComprada}</p>
            </Card>

            <Card sx={{ width: 600, margin: 1 }}>
              <CardActionArea>
                <CardMedia />
              </CardActionArea>
              <p id="textoSobre"> - Sobre o livro -</p>
              <p> Autores:</p>

              <p>
                {props.livroinfo.autores.map(function teste(element, index) {
                  console.log(props.livroinfo.autores);
                  return <p key={index}>{element.nome}</p>;
                })}
              </p>
              <p> Sinopse</p>
              <p>{novoLivro.sinopse}</p>
              <br></br>
              {props.user.type === "cliente" ? (
                <Button
                  onClick={() => {
                    console.log(livro);
                    if (props.livroinfo.quantidadeStock <= 0) {
                      alert("sem stock");
                    } else {
                      alert("livro adicionado ao carrinho com sucesso");
                      props.addItem(props.livroinfo);
                    }
                    props.shoppingCart.forEach((element) => {
                      if (element.item.id === props.livroinfo.id) {
                        if (
                          props.livroinfo.quantidadeStock > element.quantity
                        ) {
                          props.addItem(props.livroinfo);
                        }
                      }
                    });
                  }}
                >
                  Adicionar ao carrinho
                </Button>
              ) : (
                <>
                  <Button onClick={handleOpen}>Atualizar dados</Button>
                  <Button onClick={handleOpen2}>Aumentar stock</Button>
                  <Modal
                    className="modal-body "
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="quantidadeStock"
                        label="quantidadeStock"
                        type="text"
                        id="quantidadeStock"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            quantidadeStock: e.target.value,
                          });
                        }}
                      />

                      <Button
                        id="ButtonUpdateCliente"
                        onClick={() => {
                          UpdateLivro();
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        update Stock
                      </Button>
                    </Box>
                  </Modal>
                  <Modal
                    className="modal-body "
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="titulo"
                        label="titulo"
                        type="text"
                        id="titulolivro"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            titulo: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="isbn"
                        label="isbn"
                        type="text"
                        id="isbn"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            isbn: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="sinopse"
                        label="sinopse"
                        type="text"
                        id="sinopse"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            sinopse: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="edicao"
                        label="edicao"
                        type="text"
                        id="edicao"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            edicao: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preco"
                        label="preco"
                        type="text"
                        id="preco"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            preco: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="quantidadeStock"
                        label="quantidadeStock"
                        type="text"
                        id="quantidadeStock"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            quantidadeStock: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="numeroPaginas"
                        label="numeroPaginas"
                        type="text"
                        id="numeroPaginas"
                        value={novoLivro.e}
                        onChange={(e) => {
                          setNovoLivro({
                            ...novoLivro,
                            numeroPaginas: e.target.value,
                          });
                        }}
                      />
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Data Lancamento"
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
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1, width: "80%" },
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Editora
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Editora"
                            value={novoLivro.editora}
                            onChange={(e) => {
                              setNovoLivro({
                                ...novoLivro,
                                editora: e.target.value,
                              });
                            }}
                          >
                            {listaEditoras.map((element) => (
                              <MenuItem
                                sx={{
                                  "& > :not(style)": { m: 1, width: "80%" },
                                }}
                                value={element}
                                key={element.id}
                              >
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
                          <InputLabel id="demo-simple-select-label">
                            Autores
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Autor(es)"
                            multiple
                            value={novoLivro.autores}
                            onChange={(e) => {
                              setNovoLivro({
                                ...novoLivro,
                                autores: e.target.value,
                              });
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
                      <Button
                        id="ButtonUpdateCliente"
                        onClick={() => {
                          UpdateLivro();
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        update Livro
                      </Button>
                    </Box>
                  </Modal>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Typography variant="h1">Livro n??o encontrado</Typography>
  );
}
