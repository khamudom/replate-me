'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import { Person as PersonIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const UserAvatar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    handleClose();
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/auth');
    handleClose();
  };

  const handleMyRecipes = () => {
    router.push('/my-recipes');
    handleClose();
  };

  if (loading) {
    return <Avatar sx={{ bgcolor: 'grey.300' }}><PersonIcon /></Avatar>;
  }

  // Get initials from email
  const getInitials = () => {
    if (!user || !user.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <>
      <Tooltip title={user ? user.email : "Sign in"}>
        <Avatar 
          onClick={handleClick}
          sx={{ 
            bgcolor: user ? 'primary.main' : 'grey.300',
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
        >
          {user ? getInitials() : <PersonIcon />}
        </Avatar>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user ? (
          <>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Signed in
              </Typography>
            </Box>
            <MenuItem onClick={handleMyRecipes}>My Recipes</MenuItem>
            <MenuItem onClick={handleSignOut}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Sign Out
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserAvatar;