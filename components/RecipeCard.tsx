'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/types';
import { capitalize } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/recipes/${recipe.id}`);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
        alt={recipe.title}
        sx={{ 
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0'
        }}
      />
      <CardContent sx={{ 
        flex: 1,
        padding: '1rem'
      }}>
        <Typography variant="h6" component="h3" sx={{ 
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {capitalize(recipe.category)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;