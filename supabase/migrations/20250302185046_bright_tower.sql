/*
  # Fix Recipe ID Type Handling

  1. Changes
     - Add function to safely handle numeric IDs for recipes
     - This allows the app to work with both UUID and numeric string IDs
  
  2. Purpose
     - Fixes errors when accessing recipes with numeric IDs like "10"
     - Provides backward compatibility with existing data
*/

-- Create a function to get a recipe by ID that handles both UUID and numeric IDs
CREATE OR REPLACE FUNCTION get_recipe_by_id(recipe_id TEXT)
RETURNS SETOF recipes
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- First try to find by UUID
  RETURN QUERY
  SELECT *
  FROM recipes
  WHERE id::text = recipe_id;
  
  -- If no rows returned and the ID is numeric, try to find by numeric ID
  -- This is for backward compatibility with existing data
  IF NOT FOUND AND recipe_id ~ '^[0-9]+$' THEN
    RETURN QUERY
    SELECT *
    FROM recipes
    WHERE id::text = recipe_id OR id::text LIKE '%' || recipe_id;
  END IF;
  
  RETURN;
END;
$$;