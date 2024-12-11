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
import subcategoriaService from "../../services/subcategoriaService";
import categoriaService from "../../services/categoriaService";
import useAuth from "../../hooks/useAuth";

const Subcategoria = () => {
  const { isAuthenticated } = useAuth();
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredSubcategorias, setFilteredSubcategorias] = useState([]);
  const [filterNome, setFilterNome] = useState("");
  const [filterCategoriaId, setFilterCategoriaId] = useState(""); // Filtro de categoria
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubcategoria, setSelectedSubcategoria] = useState({
    id: "",
    nome: "",
    categoriaId: "",
  });
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubcategorias();
      fetchCategorias();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setFilteredSubcategorias(
      subcategorias.filter(
        (subcategoria) =>
          subcategoria.nome.toLowerCase().includes(filterNome.toLowerCase()) &&
          (filterCategoriaId === "" ||
            subcategoria.categoriaId === filterCategoriaId)
      )
    );
  }, [filterNome, filterCategoriaId, subcategorias]);

  const fetchSubcategorias = async () => {
    try {
      const data = await subcategoriaService.getSubcategorias();
      setSubcategorias(data);
      setFilteredSubcategorias(data);
    } catch (error) {
      showSnackbar("Erro ao carregar subcategorias.", "error");
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

  const handleOpenForm = (subcategoria = null) => {
    setSelectedSubcategoria(
      subcategoria || { id: "", nome: "", categoriaId: "" }
    );
    setIsEditing(!!subcategoria);
    setDialogOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedSubcategoria({ id: "", nome: "", categoriaId: "" });
    setDialogOpen(false);
  };

  const handleSaveSubcategoria = async () => {
    try {
      if (
        !selectedSubcategoria.nome.trim() ||
        !selectedSubcategoria.categoriaId
      ) {
        throw new Error("Nome e Categoria são obrigatórios.");
      }

      if (isEditing) {
        await subcategoriaService.updateSubcategoria(selectedSubcategoria.id, {
          nome: selectedSubcategoria.nome,
          categoriaId: selectedSubcategoria.categoriaId,
        });
        showSnackbar("Subcategoria atualizada com sucesso.", "success");
      } else {
        await subcategoriaService.createSubcategoria({
          nome: selectedSubcategoria.nome,
          categoriaId: selectedSubcategoria.categoriaId,
        });
        showSnackbar("Subcategoria criada com sucesso.", "success");
      }

      fetchSubcategorias();
      handleCloseForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || error.message, "error");
    }
  };

  const handleOpenDeleteConfirmation = (subcategoria) => {
    setSubcategoryToDelete(subcategoria);
    setConfirmationDialogOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setSubcategoryToDelete(null);
    setConfirmationDialogOpen(false);
  };

  const handleDeleteSubcategoria = async () => {
    try {
      if (subcategoryToDelete) {
        await subcategoriaService.deleteSubcategoria(subcategoryToDelete.id);
        showSnackbar("Subcategoria deletada com sucesso.", "success");
        fetchSubcategorias();
        handleCloseDeleteConfirmation();
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
      <h2>Subcategorias</h2>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            label="Filtrar por Nome"
            variant="outlined"
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenForm()}
      >
        Adicionar Subcategoria
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubcategorias.map((subcategoria) => (
              <TableRow key={subcategoria.id}>
                <TableCell>{subcategoria.id}</TableCell>
                <TableCell>{subcategoria.nome}</TableCell>
                <TableCell>
                  {categorias.find((cat) => cat.id === subcategoria.categoriaId)
                    ?.nome || "Não encontrado"}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenForm(subcategoria)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteConfirmation(subcategoria)}
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
          {isEditing ? "Editar Subcategoria" : "Adicionar Subcategoria"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome da Subcategoria"
            type="text"
            fullWidth
            value={selectedSubcategoria.nome}
            onChange={(e) =>
              setSelectedSubcategoria({
                ...selectedSubcategoria,
                nome: e.target.value,
              })
            }
          />
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={selectedSubcategoria.categoriaId}
              onChange={(e) =>
                setSelectedSubcategoria({
                  ...selectedSubcategoria,
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveSubcategoria} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir a subcategoria{" "}
          <strong>{subcategoryToDelete?.nome}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteSubcategoria} color="secondary">
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

export default Subcategoria;
