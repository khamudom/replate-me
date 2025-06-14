"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  Paper,
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { supabase } from "@/lib/supabase";
import { Recipe, Tag } from "@/types";
import TagList from "@/components/TagList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recipe-tabpanel-${index}`}
      aria-labelledby={`recipe-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "1.5rem 0" }}>{children}</Box>}
    </div>
  );
}

export default function RecipeDetailClientContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [tabValue, setTabValue] = useState(0);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Check if the ID is a valid UUID
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!id || !uuidRegex.test(id)) {
          throw new Error("Invalid recipe ID format");
        }

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // Fetch recipe
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Recipe not found in database");
        }

        setRecipe(data);

        // Check if current user is the owner of this recipe
        if (user && data.user_id === user.id) {
          setIsOwner(true);
        }

        // Fetch tags for this recipe
        const { data: tagData, error: tagError } = await supabase
          .from("recipe_tags")
          .select(
            `
            tag_id,
            tags:tag_id (
              id,
              name
            )
          `
          )
          .eq("recipe_id", id);

        if (!tagError && tagData) {
          setTags(tagData.map((item) => item.tags).flat());
        }
      } catch (err: any) {
        console.error("Error fetching recipe:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    router.push(`/recipes/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!recipe) return;

    setDeleteLoading(true);
    try {
      // Delete recipe
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipe.id);

      if (error) {
        throw error;
      }

      setSnackbarMessage("Recipe deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/my-recipes");
      }, 1500);
    } catch (err: any) {
      console.error("Error deleting recipe:", err);
      setSnackbarMessage(`Error deleting recipe: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !recipe) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Recipe not found
        </Typography>
        <Typography paragraph>
          The recipe you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/my-recipes")}
          sx={{ mt: 2 }}
        >
          Browse My Recipes
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          marginBottom: "1.5rem",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={
            recipe.image_url ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          }
          alt={recipe.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Action buttons for recipe owner */}
        {isOwner && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              gap: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "4px",
              padding: "4px",
            }}
          >
            <Tooltip title="Edit Recipe">
              <IconButton
                onClick={handleEditClick}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Recipe">
              <IconButton
                onClick={handleDeleteClick}
                sx={{
                  bgcolor: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Typography variant="h3" component="h1" sx={{ marginBottom: "0.5rem" }}>
        {recipe.title}
      </Typography>

      {tags.length > 0 && <TagList tags={tags} />}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="recipe tabs"
        >
          <Tab
            label="Ingredients"
            id="recipe-tab-0"
            aria-controls="recipe-tabpanel-0"
          />
          <Tab
            label="Directions"
            id="recipe-tab-1"
            aria-controls="recipe-tabpanel-1"
          />
          <Tab
            label="Notes"
            id="recipe-tab-2"
            aria-controls="recipe-tabpanel-2"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <List sx={{ listStyleType: "none", padding: 0 }}>
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <ListItem
              key={index}
              sx={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}
            >
              {ingredient}
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <List sx={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
          {recipe.directions.map((direction: string, index: number) => (
            <ListItem
              key={index}
              sx={{ padding: "0.5rem 0", marginBottom: "1rem" }}
            >
              {direction}
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Paper
          elevation={0}
          sx={{
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            borderLeft: "4px solid #4caf50",
          }}
        >
          <Typography variant="body1">
            {recipe.notes || "No notes available for this recipe."}
          </Typography>
        </Paper>
      </TabPanel>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{recipe.title}&quot;? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
