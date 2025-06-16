/**
 * CategoryClientContent Component
 *
 * This client-side component renders a grid of recipes filtered by category.
 * It fetches recipes from Supabase based on the category parameter from the URL,
 * displays a loading state while fetching, and renders recipe cards in a responsive grid.
 * The component includes a fixed header showing the category name and handles error states.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Typography, Grid, Paper, Box, CircularProgress } from "@mui/material";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types";
import { capitalize } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function CategoryClientContent() {
  const params = useParams();
  const category = params?.category as string;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = category ? capitalize(category) : "";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("category", category)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setRecipes(data || []);
      } catch (err: any) {
        console.error("Error fetching recipes by category:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          position: "fixed",
          top: "64px", // Height of the AppBar
          left: 0,
          right: 0,
          zIndex: 90,
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "white",
          maxWidth: "lg",
          mx: "auto",
          width: { xs: "calc(100% - 2rem)", lg: "calc(1200px - 2rem)" },
        }}
      >
        <Typography variant="h4" component="h1">
          {categoryName} Recipes
        </Typography>
      </Paper>

      {/* Add padding to account for fixed header */}
      <Box sx={{ paddingTop: "70px" }}>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {recipes.map((recipe: Recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}

          {recipes.length === 0 && (
            <Typography>No recipes found in this category.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}
