/**
 * New Recipe Creation Page
 *
 * This page provides a form interface for users to create new recipes.
 * Features include:
 * - Recipe title and image URL input
 * - Category selection
 * - Tag selection
 * - Dynamic ingredient list management
 * - Step-by-step directions with add/remove functionality
 * - Optional notes section
 * - Integration with Supabase for data persistence
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
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
  Paper,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Category, Tag } from "@/types";
import { Providers } from "@/app/providers";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import TagSelector from "@/components/TagSelector";

export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<Category>("dinner");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [directions, setDirections] = useState<string[]>([""]);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    try {
      // Filter out empty ingredients and directions
      const filteredIngredients = ingredients.filter(
        (item) => item.trim() !== ""
      );
      const filteredDirections = directions.filter(
        (item) => item.trim() !== ""
      );

      // Insert the recipe
      const { data: recipe, error } = await supabase
        .from("recipes")
        .insert({
          title,
          image_url: imageUrl,
          category,
          ingredients: filteredIngredients,
          directions: filteredDirections,
          notes,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

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

      // Redirect to the recipe page
      router.push(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Providers>
      <Container maxWidth="md">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}
        >
          <BackButton />

          <Typography variant="h4" component="h1" sx={{ marginBottom: "2rem" }}>
            Create New Recipe
          </Typography>

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
              <TagSelector
                selectedTags={selectedTags}
                onChange={setSelectedTags}
              />
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
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleDirectionChange(index, e.target.value)
                    }
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
            <Button variant="outlined" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Recipe"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Providers>
  );
}
