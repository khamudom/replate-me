'use client';

import React from 'react';
import { Card, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const getCategoryImage = (category: Category): string => {
  const images = {
    breakfast: 'https://images.unsplash.com/photo-1533089860892-a9c9970fab1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    lunch: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dinner: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dessert: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    snacks: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sides: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };
  
  return images[category];
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter();
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const imageUrl = getCategoryImage(category);
  
  const handleClick = () => {
    router.push(`/category/${category}`);
  };
  
  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
        transition: 'transform 0.3s ease',
        position: 'relative',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '8px'
        },
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Typography 
        variant="h5" 
        component="h3" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        {categoryName}
      </Typography>
    </Card>
  );
};

export default CategoryCard;