/*
  # Create recipes table if it doesn't exist

  1. New Tables
    - Ensures `recipes` table exists with all required columns
  
  2. Security
    - Ensures Row Level Security is enabled
    - Creates necessary policies if they don't exist
  
  This migration is designed to be idempotent - it can be run multiple times
  without causing errors, and will only create objects that don't already exist.
*/

-- Check if recipes table exists and create it if it doesn't
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'recipes'
  ) THEN
    -- Create recipes table
    CREATE TABLE recipes (
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
    CREATE INDEX recipes_user_id_idx ON recipes (user_id);
    CREATE INDEX recipes_category_idx ON recipes (category);
    CREATE INDEX recipes_created_at_idx ON recipes (created_at DESC);
  END IF;
END $$;