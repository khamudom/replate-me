'use client';

import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Providers } from '@/app/providers';

export default function NotFound() {
  const router = useRouter();

  return (
    <Providers>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The recipe or page you're looking for doesn't exist or has been moved.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => router.push('/')}
              sx={{ mr: 2 }}
            >
              Go Home
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Providers>
  );
}