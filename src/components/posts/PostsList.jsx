import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import postService from "../../services/postService";
import categoriaService from "../../services/categoriaService"; // Importe o serviço de categorias

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    const fetchPostsAndCategorias = async () => {
      try {
        // Obtenha as categorias
        const categoriasResponse = await categoriaService.getCategorias();
        setCategorias(categoriasResponse);

        // Obtenha os posts
        const postsResponse = await postService.getPosts();

        // Combine posts com a descrição da categoria
        const postsComCategoria = postsResponse.map((post) => {
          const categoria = categoriasResponse.find(
            (cat) => cat.id === post.categoriaId
          );
          return {
            ...post,
            categoriaNome: categoria ? categoria.nome : "Sem categoria",
          };
        });

        setPosts(postsComCategoria);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    };

    fetchPostsAndCategorias();
  }, []);

  const handleCategoriaClick = (categoriaId) => {
    setCategoriaSelecionada(categoriaId);
  };

  const filteredPosts = categoriaSelecionada
    ? posts.filter((post) => post.categoriaId === categoriaSelecionada)
    : posts;

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <div>
      <h2>Lista de Posts</h2>
      <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          variant={categoriaSelecionada === null ? "contained" : "outlined"}
          onClick={() => handleCategoriaClick(null)}
          sx={{ mb: 1 }}
        >
          Todas
        </Button>
        {categorias.map((categoria) => (
          <Button
            variant={
              categoriaSelecionada === categoria.id ? "contained" : "outlined"
            }
            key={categoria.id}
            onClick={() => handleCategoriaClick(categoria.id)}
            sx={{ mb: 1 }}
          >
            {categoria.nome}
          </Button>
        ))}
      </Box>
      {filteredPosts.length === 0 ? (
        <Typography>Não há posts disponíveis para esta categoria</Typography>
      ) : (
        filteredPosts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {post.metadescription}
              </Typography>
              <Typography variant="body1">{post.body}</Typography>
              <Typography variant="caption" color="textSecondary">
                Categoria: {post.categoriaNome}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostsList;
