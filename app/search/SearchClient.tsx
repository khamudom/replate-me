"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Box } from "@mui/material";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types";
import { supabase } from "@/lib/supabase";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchRecipes = async () => {
      if (!query) {
        setRecipes([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .or(`title.ilike.%${query}%, notes.ilike.%${query}%`)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setRecipes(data || []);
      } catch (err: any) {
        console.error("Error searching recipes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [query]);

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Search Results: {query}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {recipes.map((recipe: Recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}

          {recipes.length === 0 && (
            <Grid item xs={12}>
              <Typography>No recipes found matching your search.</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
