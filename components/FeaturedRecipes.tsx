'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types';
import { supabase } from '@/lib/supabase';

const FeaturedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (error) {
          throw error;
        }
        
        setRecipes(data || []);
      } catch (err: any) {
        console.error('Error fetching featured recipes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error loading recipes: {error}</Typography>
    );
  }

  if (recipes.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Recipes
        </Typography>
        <Typography>
          No recipes found. <a href="/recipes/new">Create your first recipe</a> to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Recipes
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe: Recipe) => (
          <Grid item xs={12} sm={6} md={3} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedRecipes;