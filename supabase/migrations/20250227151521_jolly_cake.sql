/*
  # Create functions and views for recipe application

  1. New Views
    - `recipe_stats` - Aggregates ratings for each recipe
  
  2. New Functions
    - `search_recipes` - Full text search for recipes
    - `get_recipes_by_category` - Get recipes filtered by category
    - `get_user_recipes` - Get recipes created by a specific user
    - `get_featured_recipes` - Get the most recent or highest rated recipes
*/

-- Create recipe_stats view
CREATE OR REPLACE VIEW recipe_stats AS
SELECT 
  r.id AS recipe_id,
  r.title,
  r.category,
  r.user_id,
  COUNT(rt.id) AS rating_count,
  COALESCE(AVG(rt.rating), 0) AS avg_rating,
  COUNT(f.id) AS favorite_count
FROM recipes r
LEFT JOIN ratings rt ON r.id = rt.recipe_id
LEFT JOIN favorites f ON r.id = f.recipe_id
GROUP BY r.id, r.title, r.category, r.user_id;

-- Create search_recipes function
CREATE OR REPLACE FUNCTION search_recipes(search_query TEXT)
RETURNS SETOF recipes
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM recipes
  WHERE 
    title ILIKE '%' || search_query || '%'
    OR search_query = ANY(ingredients)
    OR notes ILIKE '%' || search_query || '%'
  ORDER BY created_at DESC;
$$;

-- Create get_recipes_by_category function
CREATE OR REPLACE FUNCTION get_recipes_by_category(category_name TEXT)
RETURNS SETOF recipes
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM recipes
  WHERE category = category_name
  ORDER BY created_at DESC;
$$;

-- Create get_user_recipes function
CREATE OR REPLACE FUNCTION get_user_recipes(user_uuid UUID)
RETURNS SETOF recipes
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM recipes
  WHERE user_id = user_uuid
  ORDER BY created_at DESC;
$$;

-- Create get_featured_recipes function
CREATE OR REPLACE FUNCTION get_featured_recipes(limit_count INTEGER DEFAULT 4)
RETURNS SETOF recipes
LANGUAGE sql
STABLE
AS $$
  SELECT r.*
  FROM recipes r
  LEFT JOIN recipe_stats rs ON r.id = rs.recipe_id
  ORDER BY rs.avg_rating DESC NULLS LAST, r.created_at DESC
  LIMIT limit_count;
$$;