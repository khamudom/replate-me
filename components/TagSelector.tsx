'use client';

import React, { useState, useEffect } from 'react';
import { 
  Autocomplete, 
  TextField, 
  Chip, 
  Box, 
  Typography 
} from '@mui/material';
import { supabase } from '@/lib/supabase';
import { Tag } from '@/types';

interface TagSelectorProps {
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onChange }) => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
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
        
        setAvailableTags(data || []);
      } catch (err: any) {
        console.error('Error fetching tags:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTags();
  }, []);

  const handleTagChange = (_event: React.SyntheticEvent, value: Tag[]) => {
    onChange(value);
  };

  if (loading) {
    return <Typography>Loading tags...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading tags: {error}</Typography>;
  }

  return (
    <Autocomplete
      multiple
      id="tags-selector"
      options={availableTags}
      value={selectedTags}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleTagChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Select tags"
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.id}
          />
        ))
      }
    />
  );
};

export default TagSelector;