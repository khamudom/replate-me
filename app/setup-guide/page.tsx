/**
 * Setup Guide Page Component
 *
 * This page provides a step-by-step guide for setting up the Supabase database
 * for the Recipe Collection app. It includes instructions for:
 * - Creating the recipes table
 * - Setting up tags and recipe_tags tables
 * - Configuring authentication
 * - Setting environment variables
 * - Testing the connection
 *
 * The guide is presented as a vertical stepper with interactive navigation.
 */

"use client";

import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Link,
} from "@mui/material";
import { Providers } from "@/app/providers";
import BackButton from "@/components/BackButton";

export default function SetupGuidePage() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Create Recipes Table",
      description: (
        <>
          <Typography paragraph>
            First, you need to create the recipes table in your Supabase
            database. Go to the Supabase dashboard, navigate to the SQL Editor,
            and run the following migration script:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2, overflow: "auto" }}>
            <Typography
              component="pre"
              sx={{ whiteSpace: "pre-wrap", fontSize: "0.875rem" }}
            >
              {`-- Create recipes table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  category text NOT NULL,
  ingredients text[] NOT NULL,
  directions text[] NOT NULL,
  notes text,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can read recipes
CREATE POLICY "Anyone can read recipes"
  ON recipes
  FOR SELECT
  USING (true);

-- Authenticated users can insert their own recipes
CREATE POLICY "Users can insert their own recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own recipes
CREATE POLICY "Users can update their own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own recipes
CREATE POLICY "Users can delete their own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS recipes_user_id_idx ON recipes (user_id);
CREATE INDEX IF NOT EXISTS recipes_category_idx ON recipes (category);
CREATE INDEX IF NOT EXISTS recipes_created_at_idx ON recipes (created_at DESC);`}
            </Typography>
          </Paper>
          <Typography>
            You can find this script in your project at:{" "}
            <code>supabase/migrations/20250302175711_shrill_canyon.sql</code>
          </Typography>
        </>
      ),
    },
    {
      label: "Create Tags Tables",
      description: (
        <>
          <Typography paragraph>
            Next, create the tags and recipe_tags tables by running the
            following script in the SQL Editor:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2, overflow: "auto" }}>
            <Typography
              component="pre"
              sx={{ whiteSpace: "pre-wrap", fontSize: "0.875rem" }}
            >
              {`-- Create tags table if it doesn't exist
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_tags junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipe_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tags
CREATE POLICY "Anyone can read tags"
  ON tags
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for recipe_tags
CREATE POLICY "Anyone can read recipe_tags"
  ON recipe_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert recipe_tags for their recipes"
  ON recipe_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recipes
      WHERE recipes.id = recipe_id
      AND recipes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete recipe_tags for their recipes"
  ON recipe_tags
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipes
      WHERE recipes.id = recipe_id
      AND recipes.user_id = auth.uid()
    )
  );

-- Create function to get recipes by tag
CREATE OR REPLACE FUNCTION get_recipes_by_tag(tag_name TEXT)
RETURNS SETOF recipes
LANGUAGE sql
STABLE
AS $$
  SELECT r.*
  FROM recipes r
  JOIN recipe_tags rt ON r.id = rt.recipe_id
  JOIN tags t ON rt.tag_id = t.id
  WHERE t.name = tag_name
  ORDER BY r.created_at DESC;
$$;

-- Insert some common tags
INSERT INTO tags (name) VALUES
  ('vegetarian'),
  ('vegan'),
  ('gluten-free'),
  ('dairy-free'),
  ('low-carb'),
  ('keto'),
  ('paleo'),
  ('quick'),
  ('easy'),
  ('dessert'),
  ('breakfast'),
  ('lunch'),
  ('dinner'),
  ('snack'),
  ('appetizer'),
  ('main course'),
  ('side dish'),
  ('soup'),
  ('salad'),
  ('baking')
ON CONFLICT (name) DO NOTHING;`}
            </Typography>
          </Paper>
          <Typography>
            You can find this script in your project at:{" "}
            <code>supabase/migrations/20250302181506_wild_dew.sql</code>
          </Typography>
        </>
      ),
    },
    {
      label: "Configure Authentication",
      description: (
        <>
          <Typography paragraph>
            In your Supabase dashboard, go to Authentication → Settings and
            configure the following:
          </Typography>
          <Typography component="div" sx={{ mb: 2 }}>
            <ul>
              <li>Enable Email Auth (with or without email confirmation)</li>
              <li>
                Set up your Site URL (this should match your deployed site URL)
              </li>
              <li>
                Configure any additional authentication providers if needed
              </li>
            </ul>
          </Typography>
          <Typography paragraph>
            For local development, you can disable email confirmation to make
            testing easier.
          </Typography>
          <Typography paragraph>
            <strong>Important:</strong> For this demo app, email confirmation is
            disabled for convenience. In a production environment, you should
            enable email confirmation for better security.
          </Typography>
        </>
      ),
    },
    {
      label: "Set Environment Variables",
      description: (
        <>
          <Typography paragraph>
            Create a <code>.env.local</code> file in the root of your project
            with the following variables:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2 }}>
            <Typography
              component="pre"
              sx={{ whiteSpace: "pre-wrap", fontSize: "0.875rem" }}
            >
              {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
            </Typography>
          </Paper>
          <Typography paragraph>
            You can find these values in your Supabase dashboard under Project
            Settings → API.
          </Typography>
          <Typography paragraph>
            <strong>Note:</strong> The app will work without these environment
            variables using the hardcoded values, but it&apos;s recommended to
            set them up properly for your own project.
          </Typography>
        </>
      ),
    },
    {
      label: "Test Your Connection",
      description: (
        <>
          <Typography paragraph>
            Visit the{" "}
            <Link href="/test-connection" color="primary">
              Test Connection
            </Link>{" "}
            page in your app to verify that everything is working correctly.
          </Typography>
          <Typography paragraph>This page will check if:</Typography>
          <Typography component="div">
            <ul>
              <li>Your Supabase connection is working</li>
              <li>The required tables exist</li>
              <li>You can access the database</li>
            </ul>
          </Typography>
          <Typography paragraph>
            If any issues are found, the page will provide guidance on how to
            fix them.
          </Typography>
        </>
      ),
    },
    {
      label: "Start Using Your App",
      description: (
        <>
          <Typography paragraph>
            Congratulations! Your Replate Me app is now fully set up with
            Supabase. You can now:
          </Typography>
          <Typography component="div">
            <ul>
              <li>Create an account</li>
              <li>Add recipes</li>
              <li>Browse recipes by category</li>
              <li>Search for recipes</li>
              <li>Tag recipes and browse by tags</li>
            </ul>
          </Typography>
          <Typography paragraph>
            Enjoy using your new Replate Me app!
          </Typography>
        </>
      ),
    },
  ];

  return (
    <Providers>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <BackButton />

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Supabase Setup Guide
          </Typography>

          <Typography paragraph sx={{ mb: 4 }}>
            Follow these steps to set up your Supabase database for the Recipe
            Collection app.
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    {step.description}
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re all set!
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Paper>
      </Container>
    </Providers>
  );
}
