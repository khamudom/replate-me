"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Category, Tag } from "@/types";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import TagSelector from "@/components/TagSelector";

interface EditRecipeFormProps {
  id: string;
}

export default function EditRecipeForm({ id }: EditRecipeFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<Category>("dinner");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [directions, setDirections] = useState<string[]>([""]);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth");
          return;
        }

        // Fetch recipe
        const { data: recipe, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Recipe not found");
        }

        // Check if user is the owner of this recipe
        if (recipe.user_id !== user.id) {
          throw new Error("You do not have permission to edit this recipe");
        }

        // Set form values
        setTitle(recipe.title);
        setImageUrl(recipe.image_url || "");
        setCategory(recipe.category as Category);
        setIngredients(
          recipe.ingredients.length > 0 ? recipe.ingredients : [""]
        );
        setDirections(recipe.directions.length > 0 ? recipe.directions : [""]);
        setNotes(recipe.notes || "");

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
          setSelectedTags(tagData.map((item) => item.tags).flat());
        }
      } catch (err: any) {
        console.error("Error fetching recipe:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, router]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const handleAddDirection = () => {
    setDirections([...directions, ""]);
  };

  const handleDirectionChange = (index: number, value: string) => {
    const newDirections = [...directions];
    newDirections[index] = value;
    setDirections(newDirections);
  };

  const handleRemoveDirection = (index: number) => {
    if (directions.length > 1) {
      const newDirections = [...directions];
      newDirections.splice(index, 1);
      setDirections(newDirections);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      // Filter out empty ingredients and directions
      const filteredIngredients = ingredients.filter(
        (item) => item.trim() !== ""
      );
      const filteredDirections = directions.filter(
        (item) => item.trim() !== ""
      );

      // Update the recipe
      const { data: recipe, error } = await supabase
        .from("recipes")
        .update({
          title,
          image_url: imageUrl,
          category,
          ingredients: filteredIngredients,
          directions: filteredDirections,
          notes,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Delete existing recipe_tags
      await supabase.from("recipe_tags").delete().eq("recipe_id", id);

      // If we have tags, insert them into recipe_tags
      if (selectedTags.length > 0) {
        const recipeTagsToInsert = selectedTags.map((tag) => ({
          recipe_id: recipe.id,
          tag_id: tag.id,
        }));

        const { error: tagsError } = await supabase
          .from("recipe_tags")
          .insert(recipeTagsToInsert);

        if (tagsError) {
          console.error("Error inserting tags:", tagsError);
        }
      }

      setSaveSuccess(true);

      // Redirect to the recipe page after a short delay
      setTimeout(() => {
        router.push(`/recipes/${recipe.id}`);
      }, 1500);
    } catch (err: any) {
      console.error("Error updating recipe:", err);
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => router.push("/my-recipes")}>
          Back to My Recipes
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}
    >
      <BackButton />

      <Typography variant="h4" component="h1" sx={{ marginBottom: "2rem" }}>
        Edit Recipe
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Recipe updated successfully! Redirecting...
        </Alert>
      )}

      {saveError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error updating recipe: {saveError}
        </Alert>
      )}

      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          label="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="https://example.com/image.jpg"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            label="Category"
            required
          >
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
            <MenuItem value="dessert">Dessert</MenuItem>
            <MenuItem value="snacks">Snacks</MenuItem>
            <MenuItem value="sides">Side Dishes</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>

        <List sx={{ marginBottom: "1rem" }}>
          {ingredients.map((ingredient, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
              disableGutters
            >
              <TextField
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                fullWidth
                placeholder={`Ingredient ${index + 1}`}
                margin="dense"
              />
              <IconButton
                onClick={() => handleRemoveIngredient(index)}
                disabled={ingredients.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddIngredient}
          variant="outlined"
          size="small"
        >
          Add Ingredient
        </Button>
      </Box>

      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Directions
        </Typography>

        <List sx={{ marginBottom: "1rem" }}>
          {directions.map((direction, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
              disableGutters
            >
              <TextField
                value={direction}
                onChange={(e) => handleDirectionChange(index, e.target.value)}
                fullWidth
                multiline
                rows={2}
                placeholder={`Step ${index + 1}`}
                margin="dense"
              />
              <IconButton
                onClick={() => handleRemoveDirection(index)}
                disabled={directions.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddDirection}
          variant="outlined"
          size="small"
        >
          Add Step
        </Button>
      </Box>

      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Notes
        </Typography>

        <TextField
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add any additional notes about the recipe"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}
