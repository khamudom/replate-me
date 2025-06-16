/**
 * Recipe Detail Page Component
 *
 * This page component handles the display of individual recipe details.
 * It includes:
 * - Static parameter generation for recipe IDs
 * - UUID validation for recipe IDs
 * - Layout structure with back button and recipe content
 * - Integration with Supabase for data fetching
 */

import React from "react";
import { Container } from "@mui/material";
import { Providers } from "@/app/providers";
import BackButton from "@/components/BackButton";
import RecipeDetailClientContent from "./client";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    // For static export, we'll try to get all recipe IDs from Supabase
    const { data } = await supabase.from("recipes").select("id").limit(100);

    if (data && data.length > 0) {
      return data.map((recipe) => ({
        id: recipe.id.toString(),
      }));
    }
  } catch (error) {
    console.error("Error fetching recipe IDs for static params:", error);
  }

  // Include the specific ID that's causing the error
  return [
    { id: "182f5ec7-43f5-4938-be33-ee7bd864cc77" },
    { id: "8565b237-55c5-47d0-a863-db11ef1b5d80" },
  ];
}

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // If the ID doesn't match the expected format, return 404
  if (
    !params.id ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      params.id
    )
  ) {
    notFound();
  }

  return (
    <Providers>
      <Container maxWidth="lg" sx={{ padding: "1rem" }}>
        <BackButton />
        <RecipeDetailClientContent />
      </Container>
    </Providers>
  );
}
