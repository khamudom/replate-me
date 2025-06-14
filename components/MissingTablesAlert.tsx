'use client';

import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Box, Button, Link, Collapse, Typography } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

export default function MissingTablesAlert() {
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkTables = async () => {
      try {
        const response = await fetch('/api/check-tables');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to check tables');
        }
        
        setMissingTables(data.missingTables || []);
      } catch (err: any) {
        console.error('Error checking tables:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    checkTables();
  }, []);

  if (loading || missingTables.length === 0) {
    return null;
  }

  return (
    <Collapse in={open}>
      <Alert 
        severity="warning"
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={() => setOpen(false)}>
            Dismiss
          </Button>
        }
      >
        <AlertTitle>Database Setup Required</AlertTitle>
        <Typography paragraph>
          The following tables are missing from your Supabase database:
        </Typography>
        <Box component="ul" sx={{ mt: 1, mb: 2 }}>
          {missingTables.map(table => (
            <li key={table}><code>{table}</code></li>
          ))}
        </Box>
        <Typography paragraph>
          Please visit the <Link href="/setup-guide" color="inherit" sx={{ fontWeight: 'bold' }}>Setup Guide</Link> for instructions on how to create these tables.
        </Typography>
        
        {missingTables.includes('recipes') && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            For the recipes table, use the migration file: <code>supabase/migrations/20250302175711_shrill_canyon.sql</code>
          </Typography>
        )}
        
        {(missingTables.includes('tags') || missingTables.includes('recipe_tags')) && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            For the tags and recipe_tags tables, use the migration file: <code>supabase/migrations/20250302181506_wild_dew.sql</code>
          </Typography>
        )}
      </Alert>
    </Collapse>
  );
}