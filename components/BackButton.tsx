'use client';

import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={handleGoBack}
      variant="outlined"
      className={className}
      sx={{ mb: 2 }}
    >
      Back
    </Button>
  );
};

export default BackButton;