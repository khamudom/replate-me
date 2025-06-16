/**
 * Edit Recipe Page Component
 *
 * This page component handles the editing of existing recipes. It uses a dynamic route
 * parameter [id] to identify which recipe to edit. The page renders an EditRecipeForm
 * component within a Material-UI Container.
 *
 * The generateStaticParams function is used to pre-render pages for known recipe IDs
 * during build time, supporting static exports with dynamic routes.
 */

import React from "react";
import { Container } from "@mui/material";
import { Providers } from "@/app/providers";
import { supabase } from "@/lib/supabase";
import EditRecipeForm from "./EditRecipeForm";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("recipes").select("id").limit(100);

    if (data && data.length > 0) {
      return data.map((recipe) => ({
        id: recipe.id.toString(),
      }));
    }
  } catch (error) {
    console.error("Error fetching recipe IDs for static params:", error);
  }

  return [];
}

export default function EditRecipePage({ params }: { params: { id: string } }) {
  return (
    <Providers>
      <Container maxWidth="md">
        <EditRecipeForm id={params.id} />
      </Container>
    </Providers>
  );
}
