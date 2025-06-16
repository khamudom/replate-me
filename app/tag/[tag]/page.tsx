/**
 * Tag Page Component
 *
 * This is a dynamic route page component that displays recipes filtered by a specific tag.
 * It handles both static generation of common tags and dynamic fetching of tags from Supabase.
 * The page includes a back button and renders the TagPageClient component with the selected tag.
 */

import React from "react";
import { Container } from "@mui/material";
import { Providers } from "@/app/providers";
import BackButton from "@/components/BackButton";
import TagPageClient from "./client";
import { supabase } from "@/lib/supabase";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    // For static export, we'll try to get all tag names from Supabase
    const { data } = await supabase.from("tags").select("name").limit(100);

    if (data && data.length > 0) {
      return data.map((tag) => ({
        tag: tag.name,
      }));
    }
  } catch (error) {
    console.error("Error fetching tag names for static params:", error);
  }

  // Fallback to common tags if no tags are found or there's an error
  return [
    { tag: "vegetarian" },
    { tag: "vegan" },
    { tag: "gluten-free" },
    { tag: "quick" },
    { tag: "easy" },
    { tag: "breakfast" },
    { tag: "lunch" },
    { tag: "dinner" },
    { tag: "dessert" },
    { tag: "snack" },
    { tag: "appetizer" },
    { tag: "main-course" },
    { tag: "side-dish" },
    { tag: "soup" },
    { tag: "salad" },
    { tag: "baking" },
    { tag: "dairy-free" },
    { tag: "low-carb" },
    { tag: "keto" },
    { tag: "paleo" },
  ];
}

export default function TagPage({ params }: { params: { tag: string } }) {
  return (
    <Providers>
      <Container maxWidth="lg" sx={{ padding: "1rem" }}>
        <BackButton />
        <TagPageClient tag={params.tag} />
      </Container>
    </Providers>
  );
}
