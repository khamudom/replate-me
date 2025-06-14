/*
  # Create recipes table

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `image_url` (text)
      - `category` (text, not null)
      - `ingredients` (text array, not null)
      - `directions` (text array, not null)
      - `notes` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `recipes` table
    - Add policies for reading, inserting, updating, and deleting recipes
*/

-- Create recipes table if it doesn't exist
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
CREATE INDEX IF NOT EXISTS recipes_created_at_idx ON recipes (created_at DESC);