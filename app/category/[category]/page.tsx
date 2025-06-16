/**
 * Dynamic category page component that renders content for different meal categories.
 * This page handles routes like /category/breakfast, /category/lunch, etc.
 * It uses static generation for predefined categories and provides a consistent layout
 * with a back button and container for category-specific content.
 */

import React from "react";
import { Container } from "@mui/material";
import { Providers } from "@/app/providers";
import CategoryClientContent from "./client";
import BackButton from "@/components/BackButton";
import { Category } from "@/types";

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  // Explicitly list all possible category values
  const categories: Category[] = [
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snacks",
    "sides",
  ];

  return categories.map((category) => ({
    category,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <Providers>
      <Container maxWidth="lg" sx={{ padding: "1rem" }}>
        <BackButton />
        <CategoryClientContent />
      </Container>
    </Providers>
  );
}
