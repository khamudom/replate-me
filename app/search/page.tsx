/**
 * Search Page Component
 *
 * This page handles recipe search functionality. It displays search results based on the query parameter
 * from the URL. The search is performed against both recipe titles and notes using case-insensitive
 * partial matching. Results are displayed in a responsive grid layout using RecipeCard components.
 *
 * Features:
 * - Real-time search based on URL query parameter
 * - Responsive grid layout for search results
 * - Loading state handling
 * - Error handling
 * - Fixed header with search query display
 */

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types";
import { Providers } from "@/app/providers";
import BackButton from "@/components/BackButton";
import { supabase } from "@/lib/supabase";

export default function SearchPage() {
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
    <Providers>
      <Container maxWidth="lg" sx={{ padding: "1rem" }}>
        <BackButton />

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
            Search Results: {query}
          </Typography>
        </Paper>

        {/* Add padding to account for fixed header */}
        <Box sx={{ paddingTop: "70px" }}>
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
                  <Typography>
                    No recipes found matching your search.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </Providers>
  );
}
