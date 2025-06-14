/*
  # Create recipes schema

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `image_url` (text)
      - `category` (text, not null)
      - `ingredients` (text array, not null)
      - `directions` (text array, not null)
      - `notes` (text)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `recipes` table
    - Add policy for authenticated users to read all recipes
    - Add policy for authenticated users to insert their own recipes
    - Add policy for authenticated users to update their own recipes
    - Add policy for authenticated users to delete their own recipes
*/

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

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users to read all recipes
CREATE POLICY "Anyone can read recipes"
  ON recipes
  FOR SELECT
  USING (true);

-- Policy to allow users to insert their own recipes
CREATE POLICY "Users can insert their own recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own recipes
CREATE POLICY "Users can update their own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own recipes
CREATE POLICY "Users can delete their own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);