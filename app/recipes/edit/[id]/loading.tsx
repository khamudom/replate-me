/**
 * Loading component for the recipe edit page.
 * Displays a centered loading spinner with text while the recipe data is being fetched.
 */
import React from "react";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { Providers } from "@/app/providers";

export default function EditRecipeLoading() {
  return (
    <Providers>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading recipe...
          </Typography>
        </Box>
      </Container>
    </Providers>
  );
}
