/*
  # Add recipe tags functionality

  1. New Tables
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `recipe_tags`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, foreign key to recipes)
      - `tag_id` (uuid, foreign key to tags)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on both tables
    - Add policies for reading tags
    - Add policies for managing recipe_tags
  3. Functions
    - Add function to get recipes by tag
*/

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_tags junction table
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
-- Anyone can read tags
CREATE POLICY "Anyone can read tags"
  ON tags
  FOR SELECT
  USING (true);

-- Only authenticated users can create tags
CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for recipe_tags
-- Anyone can read recipe_tags
CREATE POLICY "Anyone can read recipe_tags"
  ON recipe_tags
  FOR SELECT
  USING (true);

-- Users can insert recipe_tags for their own recipes
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

-- Users can delete recipe_tags for their own recipes
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS recipe_tags_recipe_id_idx ON recipe_tags (recipe_id);
CREATE INDEX IF NOT EXISTS recipe_tags_tag_id_idx ON recipe_tags (tag_id);

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
ON CONFLICT (name) DO NOTHING;