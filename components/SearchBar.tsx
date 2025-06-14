'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAddRecipe = () => {
    router.push('/recipes/new');
  };

  return (
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
      <Box 
        component="form" 
        onSubmit={handleSearch} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <TextField
          sx={{ flex: 1 }}
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
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
  );
};

export default SearchBar;