// Next.js API route to test Supabase connection
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  try {
    // Test the connection by getting the current user
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    // Try a simple query to test database access
    const { data: recipes, error: dbError } = await supabase
      .from('recipes')
      .select('*')
      .limit(1);
    
    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }
    
    return res.status(200).json({ 
      message: 'Supabase connection successful!',
      user: data.user,
      recipes
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}