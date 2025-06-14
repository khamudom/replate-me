export type Recipe = {
  id: string;
  title: string;
  image_url: string;
  category: Category;
  ingredients: string[];
  directions: string[];
  notes: string;
  user_id: string;
  created_at: string;
  tags?: Tag[];
};

export type Category = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snacks' | 'sides';

export type User = {
  id: string;
  email: string;
};

export type Tag = {
  id: string;
  name: string;
};