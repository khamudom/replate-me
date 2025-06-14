'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Chip, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Providers } from '@/app/providers';
import BackButton from '@/components/BackButton';
import { supabase } from '@/lib/supabase';
import { Tag } from '@/types';

export default function TagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        setTags(data || []);
      } catch (err: any) {
        console.error('Error fetching tags:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTags();
  }, []);

  const handleTagClick = (tag: Tag) => {
    router.push(`/tag/${tag.name}`);
  };

  if (loading) {
    return (
      <Providers>
        <Container maxWidth="lg" sx={{ padding: '1rem' }}>
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
          <Typography variant="h4" component="h1">
            Browse by Tags
          </Typography>
        </Paper>
        
        {/* Add padding to account for fixed header */}
        <Box sx={{ paddingTop: '70px' }}>
          {error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1.5,
              p: 2
            }}>
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onClick={() => handleTagClick(tag)}
                  clickable
                  sx={{ 
                    bgcolor: '#f0f7f0',
                    color: '#2e7d32',
                    '&:hover': { bgcolor: '#e0f0e0' },
                    fontSize: '1rem',
                    py: 2.5,
                    px: 1
                  }}
                />
              ))}
              
              {tags.length === 0 && (
                <Typography>No tags found.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Providers>
  );
}