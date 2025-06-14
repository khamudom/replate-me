'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Typography, Box, Paper, Alert } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Providers } from '@/app/providers';
import BackButton from '@/components/BackButton';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignUp = searchParams?.get('signup') === 'true';
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/');
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <Providers>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <BackButton />
        
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            This is a demo app. For testing, you can create a new account with any email and password.
            Email verification is disabled for convenience.
          </Alert>
          
          <Box sx={{ mt: 4 }}>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4caf50',
                      brandAccent: '#2e7d32',
                    }
                  }
                }
              }}
              providers={[]}
              view={isSignUp ? 'sign_up' : 'sign_in'}
              redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/` : undefined}
            />
          </Box>
        </Paper>
      </Container>
    </Providers>
  );
}