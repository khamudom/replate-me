'use client';

import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Tag } from '@/types';

interface TagListProps {
  tags: Tag[];
  onClick?: (tag: Tag) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onClick }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          size="small"
          onClick={onClick ? () => onClick(tag) : undefined}
          clickable={!!onClick}
          sx={{ 
            bgcolor: '#f0f7f0',
            color: '#2e7d32',
            '&:hover': onClick ? { bgcolor: '#e0f0e0' } : undefined
          }}
        />
      ))}
    </Box>
  );
};

export default TagList;