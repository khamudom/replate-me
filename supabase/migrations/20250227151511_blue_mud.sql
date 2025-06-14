/*
  # Create favorites schema

  1. New Tables
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `recipe_id` (uuid, foreign key to recipes)
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on `favorites` table
    - Add policies for:
      - Users can read their own favorites
      - Users can insert their own favorites
      - Users can delete their own favorites
*/

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own favorites
CREATE POLICY "Users can read their own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own favorites
CREATE POLICY "Users can insert their own favorites"
  ON favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
CREATE INDEX IF NOT EXISTS favorites_recipe_id_idx ON favorites (recipe_id);