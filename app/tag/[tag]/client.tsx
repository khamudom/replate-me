'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types';
import { supabase } from '@/lib/supabase';
import { capitalize } from '@/lib/utils';

interface TagPageClientProps {
  tag: string;
}

export default function TagPageClient({ tag }: TagPageClientProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecipesByTag = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_recipes_by_tag', { tag_name: tag });
        
        if (error) {
          throw error;
        }
        
        setRecipes(data || []);
      } catch (err: any) {
        console.error('Error fetching recipes by tag:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipesByTag();
  }, [tag]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
      <Paper 
        elevation={2}
        sx={{
          position: 'fixed',
          top: '64px', // Height of the AppBar
          left: 0,
          right: 0,
          zIndex: 90,
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: 'white',
          maxWidth: 'lg',
          mx: 'auto',
          width: { xs: 'calc(100% - 2rem)', lg: 'calc(1200px - 2rem)' },
        }}
      >
        <Typography variant="h4" component="h1">
          {capitalize(tag)} Recipes
        </Typography>
      </Paper>
      
      {/* Add padding to account for fixed header */}
      <Box sx={{ paddingTop: '70px' }}>
        <Grid container spacing={3} sx={{ marginBottom: '2rem' }}>
          {recipes.map((recipe: Recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
          
          {recipes.length === 0 && (
            <Grid item xs={12}>
              <Typography>No recipes found with the tag "{tag}".</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}