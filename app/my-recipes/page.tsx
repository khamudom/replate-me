'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Paper, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types';
import { Providers } from '@/app/providers';
import { supabase } from '@/lib/supabase';
import BackButton from '@/components/BackButton';

export default function MyRecipesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }
      
      setUserId(user.id);
      
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setRecipes(data || []);
      } catch (err: any) {
        console.error('Error fetching user recipes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleAddRecipe = () => {
    router.push('/recipes/new');
  };
  
  if (loading) {
    return (
      <Providers>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Providers>
    );
  }

  return (
    <Providers>
      <Container maxWidth="lg" sx={{ padding: '1rem' }}>
        <BackButton />
        
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
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Typography variant="h4" component="h1">
              My Recipes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddRecipe}
            >
              Add Recipe
            </Button>
          </Box>
        </Paper>
        
        {/* Add padding to account for fixed header */}
        <Box sx={{ paddingTop: '70px' }}>
          {error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : (
            <Grid container spacing={3} sx={{ marginBottom: '2rem' }}>
              {recipes.map((recipe: Recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
              
              {recipes.length === 0 && (
                <Typography>You haven't created any recipes yet.</Typography>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </Providers>
  );
}