/*
  # Create ratings schema

  1. New Tables
    - `ratings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `recipe_id` (uuid, foreign key to recipes)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on `ratings` table
    - Add policies for:
      - Anyone can read ratings
      - Users can insert their own ratings
      - Users can update their own ratings
      - Users can delete their own ratings
*/

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable Row Level Security
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can read ratings
CREATE POLICY "Anyone can read ratings"
  ON ratings
  FOR SELECT
  USING (true);

-- Users can insert their own ratings
CREATE POLICY "Users can insert their own ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ratings
CREATE POLICY "Users can update their own ratings"
  ON ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own ratings
CREATE POLICY "Users can delete their own ratings"
  ON ratings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS ratings_user_id_idx ON ratings (user_id);
CREATE INDEX IF NOT EXISTS ratings_recipe_id_idx ON ratings (recipe_id);