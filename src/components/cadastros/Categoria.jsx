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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import categoriaService from "../../services/categoriaService";
import useAuth from "../../hooks/useAuth";

const Categoria = () => {
  const { isAuthenticated } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [filterNome, setFilterNome] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({
    id: "",
    nome: "",
  });
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategorias();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setFilteredCategorias(
      categorias.filter((categoria) =>
        categoria.nome.toLowerCase().includes(filterNome.toLowerCase())
      )
    );
  }, [filterNome, categorias]);

  const fetchCategorias = async () => {
    try {
      const data = await categoriaService.getCategorias();
      setCategorias(data);
      setFilteredCategorias(data);
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  const handleOpenForm = (categoria = null) => {
    if (categoria) {
      setSelectedCategoria(categoria);
      setIsEditing(true);
    } else {
      setSelectedCategoria({ id: "", nome: "" });
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedCategoria({ id: "", nome: "" });
    setDialogOpen(false);
  };

  const handleSaveCategoria = async () => {
    try {
      if (!selectedCategoria.id.trim() || !selectedCategoria.nome.trim()) {
        throw new Error("ID e Nome da categoria são obrigatórios.");
      }

      if (
        !isEditing &&
        categorias.some((cat) => cat.id === selectedCategoria.id)
      ) {
        throw new Error(
          "O ID fornecido já existe. Por favor, escolha um ID distinto."
        );
      }

      if (isEditing) {
        await categoriaService.updateCategoria(selectedCategoria.id, {
          nome: selectedCategoria.nome,
        });
        showSnackbar("Categoria atualizada com sucesso", "success");
      } else {
        await categoriaService.createCategoria(selectedCategoria);
        showSnackbar("Categoria criada com sucesso", "success");
      }
      handleCloseForm();
      fetchCategorias();
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  const handleOpenDeleteConfirmation = (categoria) => {
    setCategoryToDelete(categoria);
    setConfirmationDialogOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setCategoryToDelete(null);
    setConfirmationDialogOpen(false);
  };

  const handleDeleteCategoria = async () => {
    try {
      if (categoryToDelete) {
        await categoriaService.deleteCategoria(categoryToDelete.id);
        showSnackbar("Categoria deletada com sucesso", "success");
        fetchCategorias();
        handleCloseDeleteConfirmation();
      }
    } catch (error) {
      showSnackbar(error.message, "error");
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
      <h2>Categorias</h2>
      <TextField
        label="Filtrar por Nome"
        variant="outlined"
        value={filterNome}
        onChange={(e) => setFilterNome(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenForm()}
      >
        Adicionar Categoria
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategorias.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.id}</TableCell>
                <TableCell>{categoria.nome}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenForm(categoria)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteConfirmation(categoria)}
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
          {isEditing ? "Editar Categoria" : "Adicionar Categoria"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={!isEditing}
            margin="dense"
            label="ID da Categoria"
            type="text"
            fullWidth
            value={selectedCategoria.id}
            onChange={(e) =>
              setSelectedCategoria({
                ...selectedCategoria,
                id: e.target.value,
              })
            }
            disabled={isEditing}
          />
          <TextField
            margin="dense"
            label="Nome da Categoria"
            type="text"
            fullWidth
            value={selectedCategoria.nome}
            onChange={(e) =>
              setSelectedCategoria({
                ...selectedCategoria,
                nome: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveCategoria} color="primary">
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
          Tem certeza de que deseja excluir a categoria{" "}
          <strong>{categoryToDelete?.nome}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteCategoria} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Categoria;
