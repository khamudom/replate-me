/**
 * Home page component that displays the main landing page of the recipe application.
 * Features include:
 * - Search functionality
 * - Featured recipes section
 * - Category navigation cards
 * - Missing tables alert for database setup
 */

"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";
import { Providers } from "./providers";
import MissingTablesAlert from "@/components/MissingTablesAlert";

const categories: Category[] = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snacks",
  "sides",
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
  }, []);

  return (
    <Providers>
      <Container maxWidth="lg" sx={{ padding: "1rem" }}>
        <MissingTablesAlert />

        <SearchBar />

        {/* Add padding to account for fixed search bar */}
        <Box sx={{ paddingTop: "70px" }}>
          <Box sx={{ margin: "2rem 0" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : isClient ? (
              <FeaturedRecipes />
            ) : (
              <Typography>Loading featured recipes...</Typography>
            )}
          </Box>

          <Box sx={{ margin: "2rem 0" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Categories
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {categories.map((category) => (
                <CategoryCard key={category} category={category} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Providers>
  );
}
