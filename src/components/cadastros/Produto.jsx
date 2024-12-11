import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import produtoService from "../../services/produtoService";
import categoriaService from "../../services/categoriaService";
import subcategoriaService from "../../services/subcategoriaService";
import useAuth from "../../hooks/useAuth";

// Definir sua variável API_BASE_URL se necessário
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const Produto = () => {
  const { isAuthenticated } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [filterNome, setFilterNome] = useState("");
  const [filterCategoriaId, setFilterCategoriaId] = useState("");
  const [filterSubcategoriaId, setFilterSubcategoriaId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState({
    id: "",
    nome: "",
    preco: "",
    categoriaId: "",
    subcategoriaId: "",
    imagem: "",
  });
  const [imagem, setImagem] = useState(null); // Para armazenar o arquivo da imagem
  const [productToDelete, setProductToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (isAuthenticated) {
      fetchProdutos();
      fetchCategorias();
      fetchSubcategorias();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setFilteredProdutos(
      produtos.filter((produto) => {
        const categoriaMatch =
          filterCategoriaId === "" ||
          String(produto.categoriaId) === String(filterCategoriaId);
        const subcategoriaMatch =
          filterSubcategoriaId === "" ||
          Number(produto.subcategoriaId) === Number(filterSubcategoriaId);
        const nomeMatch = produto.nome
          .toLowerCase()
          .includes(filterNome.toLowerCase());

        return categoriaMatch && subcategoriaMatch && nomeMatch;
      })
    );
  }, [filterNome, filterCategoriaId, filterSubcategoriaId, produtos]);

  const fetchProdutos = async () => {
    try {
      const data = await produtoService.getProdutos();
      setProdutos(data);
      setFilteredProdutos(data);
    } catch (error) {
      showSnackbar("Erro ao carregar produtos.", "error");
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await categoriaService.getCategorias();
      setCategorias(data);
    } catch (error) {
      showSnackbar("Erro ao carregar categorias.", "error");
    }
  };

  const fetchSubcategorias = async () => {
    try {
      const data = await subcategoriaService.getSubcategorias();
      setSubcategorias(data);
    } catch (error) {
      showSnackbar("Erro ao carregar subcategorias.", "error");
    }
  };

  const handleOpenForm = (produto = null) => {
    setSelectedProduto(
      produto || {
        id: "",
        nome: "",
        preco: "",
        categoriaId: "",
        subcategoriaId: "",
        imagem: produto?.imagem || "",
      }
    );
    setImagem(null); // Reseta a imagem no formulário
    setIsEditing(!!produto);
    setDialogOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedProduto({
      id: "",
      nome: "",
      preco: "",
      categoriaId: "",
      subcategoriaId: "",
      imagem: "",
    });
    setDialogOpen(false);
  };

  const handleSaveProduto = async () => {
    try {
      if (
        !selectedProduto.nome.trim() ||
        !selectedProduto.preco ||
        !selectedProduto.categoriaId
      ) {
        throw new Error("Nome, Preço e Categoria são obrigatórios.");
      }

      if (isEditing) {
        await produtoService.updateProduto(
          selectedProduto.id,
          {
            nome: selectedProduto.nome,
            preco: selectedProduto.preco,
            categoriaId: selectedProduto.categoriaId,
            subcategoriaId: selectedProduto.subcategoriaId,
          },
          imagem
        );
        showSnackbar("Produto atualizado com sucesso.", "success");
      } else {
        await produtoService.createProduto(
          {
            nome: selectedProduto.nome,
            preco: selectedProduto.preco,
            categoriaId: selectedProduto.categoriaId,
            subcategoriaId: selectedProduto.subcategoriaId,
          },
          imagem
        );
        showSnackbar("Produto criado com sucesso.", "success");
      }

      fetchProdutos();
      handleCloseForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || error.message, "error");
    }
  };

  const handleDeleteProduto = async () => {
    try {
      if (productToDelete) {
        await produtoService.deleteProduto(productToDelete.id);
        showSnackbar("Produto deletado com sucesso.", "success");
        fetchProdutos();
        setProductToDelete(null);
      }
    } catch (error) {
      showSnackbar(error.response?.data?.message || error.message, "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <h2>Produtos</h2>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={4}>
          <TextField
            label="Filtrar por Nome"
            variant="outlined"
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Filtrar por Categoria</InputLabel>
            <Select
              value={filterCategoriaId}
              onChange={(e) => setFilterCategoriaId(e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Filtrar por Subcategoria</InputLabel>
            <Select
              value={filterSubcategoriaId}
              onChange={(e) => setFilterSubcategoriaId(e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {subcategorias.map((subcategoria) => (
                <MenuItem key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenForm()}
      >
        Adicionar Produto
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Subcategoria</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProdutos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.preco.toFixed(2)}</TableCell>
                <TableCell>
                  {categorias.find(
                    (cat) => String(cat.id) === String(produto.categoriaId)
                  )?.nome || "Não encontrado"}
                </TableCell>
                <TableCell>
                  {subcategorias.find(
                    (sub) => sub.id === produto.subcategoriaId
                  )?.nome || "Não encontrado"}
                </TableCell>
                <TableCell>
                  {produto.imagem && (
                    <img
                      src={`http://localhost:3000/uploads/${produto.imagem}`}
                      alt={produto.nome}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenForm(produto)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setProductToDelete(produto)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseForm}>
        <DialogTitle>
          {isEditing ? "Editar Produto" : "Adicionar Produto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome do Produto"
            type="text"
            fullWidth
            value={selectedProduto.nome}
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto, nome: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Preço"
            type="number"
            fullWidth
            value={selectedProduto.preco}
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto, preco: e.target.value })
            }
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={selectedProduto.categoriaId}
              onChange={(e) =>
                setSelectedProduto({
                  ...selectedProduto,
                  categoriaId: e.target.value,
                })
              }
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Subcategoria</InputLabel>
            <Select
              value={selectedProduto.subcategoriaId}
              onChange={(e) =>
                setSelectedProduto({
                  ...selectedProduto,
                  subcategoriaId: e.target.value,
                })
              }
            >
              {subcategorias.map((subcategoria) => (
                <MenuItem key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedProduto.imagem && (
            <img
              src={`${API_BASE_URL}/uploads/${selectedProduto.imagem}`}
              alt={selectedProduto.nome}
              style={{ width: "300px", height: "300px", marginTop: "16px" }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveProduto} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!productToDelete} onClose={() => setProductToDelete(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir o produto{" "}
          <strong>{productToDelete?.nome}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductToDelete(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduto} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Produto;
