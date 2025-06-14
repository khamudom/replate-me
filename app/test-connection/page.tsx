'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Box, CircularProgress, Alert } from '@mui/material';
import { Providers } from '@/app/providers';
import BackButton from '@/components/BackButton';
import { supabase } from '@/lib/supabase';

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [tableStatus, setTableStatus] = useState<{[key: string]: boolean}>({});

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setTableStatus({});
    
    try {
      // Test authentication
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        throw new Error(`Auth error: ${authError.message}`);
      }
      
      // Check if tables exist
      const tables = ['recipes', 'tags', 'recipe_tags'];
      const tableStatusResults: {[key: string]: boolean} = {};
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);
          
          tableStatusResults[table] = !error;
        } catch (err) {
          tableStatusResults[table] = false;
        }
      }
      
      setTableStatus(tableStatusResults);
      
      // Try to get a recipe if the table exists
      let recipes = null;
      if (tableStatusResults['recipes']) {
        const { data: recipesData, error: recipesError } = await supabase
          .from('recipes')
          .select('*')
          .limit(1);
        
        if (!recipesError) {
          recipes = recipesData;
        }
      }
      
      setResult({
        auth: authData,
        recipes
      });
    } catch (err: any) {
      console.error('Connection test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Providers>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <BackButton />
        
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Test Supabase Connection
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={testConnection}
            disabled={loading}
            sx={{ mt: 2, mb: 4 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Test Connection'}
          </Button>
          
          {error && (
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee' }}>
              <Typography color="error">Error: {error}</Typography>
            </Paper>
          )}
          
          {Object.keys(tableStatus).length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Table Status:</Typography>
              {Object.entries(tableStatus).map(([table, exists]) => (
                <Alert 
                  key={table} 
                  severity={exists ? "success" : "error"}
                  sx={{ mb: 1 }}
                >
                  {table}: {exists ? "Exists" : "Does not exist"}
                </Alert>
              ))}
              
              {!tableStatus['recipes'] && (
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  The recipes table doesn't exist. Please run the migration script in the Supabase SQL Editor.
                  You can find the script at: <code>supabase/migrations/20250302175711_shrill_canyon.sql</code>
                </Typography>
              )}
              
              {(!tableStatus['tags'] || !tableStatus['recipe_tags']) && (
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  The tags and/or recipe_tags tables don't exist. Please run the migration script in the Supabase SQL Editor.
                  You can find the script at: <code>supabase/migrations/20250302181506_wild_dew.sql</code>
                </Typography>
              )}
            </Box>
          )}
          
          {result && (
            <Box>
              <Typography variant="h6" gutterBottom>Connection Successful!</Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Authentication:</Typography>
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5', maxHeight: '200px', overflow: 'auto' }}>
                <pre>{JSON.stringify(result.auth, null, 2)}</pre>
              </Paper>
              
              {result.recipes !== null && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>Database (Recipes):</Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5', maxHeight: '200px', overflow: 'auto' }}>
                    <pre>{JSON.stringify(result.recipes, null, 2)}</pre>
                  </Paper>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Providers>
  );
}