import React from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { Providers } from '@/app/providers';

export default function RecipeDetailLoading() {
  return (
    <Providers>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '50vh' 
        }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading recipe...
          </Typography>
        </Box>
      </Container>
    </Providers>
  );
}