"use client";

import React, { useState, ReactNode, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  LocalOffer as TagIcon,
  ExpandLess,
  ExpandMore,
  HelpOutline as HelpIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import UserAvatar from "./UserAvatar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    setDrawerOpen(false);
  };

  const handleTagsClick = () => {
    setTagsOpen(!tagsOpen);
  };

  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            Replate Me
          </Typography>
          <UserAvatar />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem
              button
              onClick={() => {
                router.push("/");
                toggleDrawer(false)();
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={handleTagsClick}>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary="Tags" />
              {tagsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={tagsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push("/tags");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary="Browse All Tags" />
                </ListItem>
              </List>
            </Collapse>

            {user ? (
              <>
                <ListItem
                  button
                  onClick={() => {
                    router.push("/my-recipes");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Recipes" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    router.push("/settings");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  onClick={() => {
                    router.push("/auth");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    router.push("/auth?signup=true");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemIcon>
                    <SignupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}

            <Divider />

            <ListItem button onClick={handleHelpClick}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Setup" />
              {helpOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={helpOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push("/setup-guide");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary="Setup Guide" />
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push("/test-connection");
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary="Test Connection" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      <main>{children}</main>
    </>
  );
};

export default Layout;
