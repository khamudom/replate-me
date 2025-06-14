import { Recipe, Category, User } from '@/types';

// Sample users
export const users: User[] = [
  {
    id: '1',
    email: 'user1@example.com',
  },
  {
    id: '2',
    email: 'user2@example.com',
  },
  {
    id: '3',
    email: 'user3@example.com',
  }
];

// Sample recipes
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pancakes',
    image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'breakfast',
    ingredients: [
      '1 cup all-purpose flour',
      '2 tablespoons sugar',
      '2 teaspoons baking powder',
      '1/2 teaspoon salt',
      '1 cup milk',
      '2 tablespoons melted butter',
      '1 large egg'
    ],
    directions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In another bowl, beat the milk, melted butter, and egg together.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined (lumps are okay).',
      'Heat a lightly oiled griddle or frying pan over medium-high heat.',
      'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.',
      'Cook until bubbles form on the surface, then flip and cook until browned on the other side.'
    ],
    notes: 'Serve with maple syrup, fresh berries, or whipped cream.',
    user_id: '1',
    created_at: '2025-02-15T08:30:00Z'
  },
  {
    id: '2',
    title: 'Avocado Toast',
    image_url: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'breakfast',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '1/2 lemon, juiced',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)',
      '2 eggs (optional)'
    ],
    directions: [
      'Toast the bread until golden and firm.',
      'Remove the pit from the avocado and scoop the flesh into a bowl.',
      'Add lemon juice, salt, and pepper to the avocado and mash with a fork.',
      'Spread the mashed avocado on top of the toast.',
      'If desired, top with a fried or poached egg.',
      'Sprinkle with red pepper flakes if you want some heat.'
    ],
    notes: 'For extra flavor, try adding crumbled feta cheese, sliced radishes, or microgreens on top.',
    user_id: '2',
    created_at: '2025-02-18T09:15:00Z'
  },
  {
    id: '3',
    title: 'Chicken Caesar Salad',
    image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'lunch',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '1 large head romaine lettuce, chopped',
      '1/2 cup Caesar dressing',
      '1/2 cup croutons',
      '1/4 cup grated Parmesan cheese',
      'Salt and pepper to taste',
      '1 lemon, cut into wedges'
    ],
    directions: [
      'Season chicken breasts with salt and pepper.',
      'Grill or pan-fry the chicken until cooked through, about 6-7 minutes per side.',
      'Let the chicken rest for 5 minutes, then slice into strips.',
      'In a large bowl, toss the chopped romaine with Caesar dressing.',
      'Add the croutons and Parmesan cheese and toss again.',
      'Top with the sliced chicken and serve with lemon wedges.'
    ],
    notes: 'For a healthier version, use Greek yogurt-based Caesar dressing and whole grain croutons.',
    user_id: '1',
    created_at: '2025-02-20T12:45:00Z'
  },
  {
    id: '4',
    title: 'Beef Stir Fry',
    image_url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'dinner',
    ingredients: [
      '1 lb flank steak, thinly sliced',
      '2 tablespoons vegetable oil',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '1 cup broccoli florets',
      '2 carrots, julienned',
      '3 cloves garlic, minced',
      '1 tablespoon ginger, minced',
      '1/4 cup soy sauce',
      '2 tablespoons honey',
      '1 tablespoon cornstarch',
      '1/4 cup water',
      'Green onions for garnish'
    ],
    directions: [
      'In a small bowl, whisk together soy sauce, honey, cornstarch, and water. Set aside.',
      'Heat 1 tablespoon oil in a large wok or skillet over high heat.',
      'Add the beef and stir-fry until browned, about 3-4 minutes. Remove and set aside.',
      'Add the remaining oil to the pan. Add garlic and ginger, stir for 30 seconds.',
      'Add all the vegetables and stir-fry for 4-5 minutes until crisp-tender.',
      'Return the beef to the pan. Pour the sauce over and cook, stirring, until the sauce thickens, about 2 minutes.',
      'Garnish with green onions and serve over rice.'
    ],
    notes: 'This recipe works well with chicken or tofu instead of beef. For a spicier version, add red pepper flakes or sriracha to the sauce.',
    user_id: '3',
    created_at: '2025-02-22T18:30:00Z'
  },
  {
    id: '5',
    title: 'Chocolate Chip Cookies',
    image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'dessert',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 teaspoon baking soda',
      '1 teaspoon salt',
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 teaspoons vanilla extract',
      '2 cups semi-sweet chocolate chips'
    ],
    directions: [
      'Preheat oven to 375°F (190°C).',
      'In a small bowl, whisk together the flour, baking soda, and salt.',
      'In a large bowl, beat the butter, granulated sugar, and brown sugar until creamy.',
      'Add eggs one at a time, beating well after each addition. Stir in vanilla.',
      'Gradually beat in the flour mixture. Stir in chocolate chips.',
      'Drop by rounded tablespoons onto ungreased baking sheets.',
      'Bake for 9 to 11 minutes or until golden brown.',
      'Cool on baking sheets for 2 minutes, then remove to wire racks to cool completely.'
    ],
    notes: 'For chewier cookies, use more brown sugar than granulated sugar. For crispier cookies, do the opposite.',
    user_id: '2',
    created_at: '2025-02-25T15:20:00Z'
  },
  {
    id: '6',
    title: 'Guacamole',
    image_url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'snacks',
    ingredients: [
      '3 ripe avocados',
      '1 lime, juiced',
      '1/2 teaspoon salt',
      '1/2 cup diced onion',
      '3 tablespoons chopped fresh cilantro',
      '2 roma tomatoes, diced',
      '1 clove garlic, minced',
      '1 pinch ground cayenne pepper (optional)'
    ],
    directions: [
      'Cut avocados in half, remove pit, and scoop into a bowl.',
      'Add lime juice and salt. Mash until smooth.',
      'Mix in onion, cilantro, tomatoes, and garlic.',
      'Stir in cayenne pepper if desired.',
      'Refrigerate for at least 1 hour before serving to allow flavors to blend.'
    ],
    notes: 'To prevent browning, press plastic wrap directly onto the surface of the guacamole before refrigerating.',
    user_id: '1',
    created_at: '2025-02-28T16:45:00Z'
  },
  {
    id: '7',
    title: 'Roasted Garlic Mashed Potatoes',
    image_url: 'https://images.unsplash.com/photo-1600175074394-5d23b9f6d319?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'sides',
    ingredients: [
      '3 lbs Yukon Gold potatoes, peeled and quartered',
      '1 whole head of garlic',
      '1/4 cup olive oil',
      '1/2 cup butter, softened',
      '1/2 cup whole milk, warmed',
      '1/4 cup sour cream',
      'Salt and pepper to taste',
      'Chopped chives for garnish'
    ],
    directions: [
      'Preheat oven to 400°F (200°C).',
      'Cut the top off the garlic head to expose the cloves. Drizzle with olive oil, wrap in foil, and roast for 30-40 minutes until soft.',
      'Meanwhile, place potatoes in a large pot and cover with cold water. Add a generous pinch of salt.',
      'Bring to a boil, then reduce heat and simmer until potatoes are fork-tender, about 15-20 minutes.',
      'Drain potatoes and return to the pot. Allow them to dry for a minute over low heat.',
      'Squeeze the roasted garlic cloves into the pot with the potatoes.',
      'Add butter and mash the potatoes. Gradually add warm milk and sour cream while continuing to mash until smooth.',
      'Season with salt and pepper to taste. Garnish with chopped chives before serving.'
    ],
    notes: 'For extra richness, add grated Parmesan cheese. For a lighter version, use chicken broth instead of some of the milk and butter.',
    user_id: '3',
    created_at: '2025-03-01T14:10:00Z'
  },
  {
    id: '8',
    title: 'Vegetable Soup',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'lunch',
    ingredients: [
      '2 tablespoons olive oil',
      '1 onion, diced',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '3 cloves garlic, minced',
      '1 zucchini, diced',
      '1 cup green beans, trimmed and cut into 1-inch pieces',
      '1 can (14.5 oz) diced tomatoes',
      '6 cups vegetable broth',
      '1 teaspoon dried thyme',
      '1 bay leaf',
      '1 cup small pasta (like ditalini or small shells)',
      'Salt and pepper to taste',
      'Fresh parsley, chopped, for garnish',
      'Grated Parmesan cheese for serving (optional)'
    ],
    directions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrots, and celery. Cook until softened, about 5 minutes.',
      'Add garlic and cook for another minute.',
      'Add zucchini, green beans, diced tomatoes, vegetable broth, thyme, and bay leaf.',
      'Bring to a boil, then reduce heat and simmer for 15 minutes.',
      'Add pasta and cook until tender, about 8-10 minutes more.',
      'Remove bay leaf. Season with salt and pepper to taste.',
      'Serve garnished with fresh parsley and Parmesan cheese if desired.'
    ],
    notes: 'This soup is very adaptable. Feel free to use whatever vegetables you have on hand. For a heartier version, add a can of drained and rinsed white beans.',
    user_id: '2',
    created_at: '2025-03-03T11:25:00Z'
  },
  {
    id: '9',
    title: 'Banana Bread',
    image_url: 'https://images.unsplash.com/photo-1605190557072-1fe6a230ee65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'breakfast',
    ingredients: [
      '3 ripe bananas, mashed',
      '1/3 cup melted butter',
      '1 teaspoon baking soda',
      'Pinch of salt',
      '3/4 cup sugar',
      '1 large egg, beaten',
      '1 teaspoon vanilla extract',
      '1 1/2 cups all-purpose flour',
      '1/2 cup chopped walnuts or pecans (optional)'
    ],
    directions: [
      'Preheat oven to 350°F (175°C). Grease a 4x8 inch loaf pan.',
      'In a mixing bowl, mash the ripe bananas with a fork.',
      'Stir in the melted butter.',
      'Mix in the baking soda and salt.',
      'Stir in the sugar, beaten egg, and vanilla extract.',
      'Mix in the flour.',
      'Fold in the nuts if using.',
      'Pour the batter into the prepared loaf pan.',
      'Bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean.',
      'Let cool in the pan for 10 minutes, then remove to a wire rack to cool completely.'
    ],
    notes: 'The riper the bananas, the sweeter the bread will be. For extra flavor, add 1/2 teaspoon of cinnamon or a handful of chocolate chips to the batter.',
    user_id: '1',
    created_at: '2025-03-05T09:40:00Z'
  },
  {
    id: '10',
    title: 'Homemade Pizza',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'dinner',
    ingredients: [
      'For the dough:',
      '2 1/4 teaspoons active dry yeast',
      '1 teaspoon sugar',
      '1 cup warm water',
      '2 1/2 cups all-purpose flour',
      '2 tablespoons olive oil',
      '1 teaspoon salt',
      'For the topping:',
      '1/2 cup pizza sauce',
      '2 cups shredded mozzarella cheese',
      '1/2 cup sliced pepperoni',
      '1/4 cup sliced black olives',
      '1/4 cup sliced green bell pepper',
      '1/4 cup sliced red onion',
      'Fresh basil leaves for garnish'
    ],
    directions: [
      'In a small bowl, dissolve yeast and sugar in warm water. Let stand until creamy, about 10 minutes.',
      'In a large bowl, combine flour, olive oil, and salt. Stir in the yeast mixture.',
      'Knead until smooth, about 8 minutes. Place in a well-oiled bowl, cover, and let rise until doubled, about 1 hour.',
      'Preheat oven to 450°F (230°C).',
      'Punch down dough and spread onto a pizza pan or baking sheet.',
      'Spread pizza sauce over the dough. Top with cheese and desired toppings.',
      'Bake for 15-20 minutes, or until the crust is golden brown and the cheese is bubbly.',
      'Garnish with fresh basil leaves before serving.'
    ],
    notes: 'For a crispier crust, preheat a pizza stone in the oven and slide the pizza onto it. You can customize the toppings to your preference.',
    user_id: '3',
    created_at: '2025-03-07T19:15:00Z'
  },
  {
    id: '11',
    title: 'Strawberry Cheesecake',
    image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'dessert',
    ingredients: [
      'For the crust:',
      '1 1/2 cups graham cracker crumbs',
      '1/3 cup melted butter',
      '1/4 cup sugar',
      'For the filling:',
      '4 (8 oz) packages cream cheese, softened',
      '1 1/4 cups sugar',
      '1/2 cup sour cream',
      '2 teaspoons vanilla extract',
      '5 large eggs',
      'For the topping:',
      '2 cups fresh strawberries, hulled and sliced',
      '1/2 cup strawberry jam, warmed'
    ],
    directions: [
      'Preheat oven to 325°F (165°C). Grease a 9-inch springform pan.',
      'In a medium bowl, mix graham cracker crumbs, melted butter, and 1/4 cup sugar. Press onto the bottom of the pan.',
      'In a large bowl, beat cream cheese and 1 1/4 cups sugar until smooth. Blend in sour cream and vanilla.',
      'Beat in eggs one at a time, mixing just enough to incorporate.',
      'Pour filling over crust.',
      'Bake for 1 hour and 10 minutes. Turn off the oven, crack the door, and let the cheesecake cool in the oven for 1 hour.',
      'Refrigerate for at least 4 hours or overnight.',
      'Before serving, arrange sliced strawberries on top and brush with warmed strawberry jam.'
    ],
    notes: 'To prevent cracks, avoid overmixing the batter and don\'t open the oven door during baking. For a water bath method, wrap the outside of the pan in foil and place in a larger pan with hot water halfway up the sides during baking.',
    user_id: '2',
    created_at: '2025-03-10T16:30:00Z'
  },
  {
    id: '12',
    title: 'Hummus',
    image_url: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'snacks',
    ingredients: [
      '1 (15 oz) can chickpeas, drained and rinsed',
      '1/4 cup fresh lemon juice',
      '1/4 cup tahini',
      '2 cloves garlic, minced',
      '2 tablespoons olive oil, plus more for serving',
      '1/2 teaspoon ground cumin',
      '2-3 tablespoons water',
      'Salt to taste',
      'Paprika and chopped parsley for garnish'
    ],
    directions: [
      'In a food processor, combine chickpeas, lemon juice, tahini, garlic, olive oil, and cumin.',
      'Process until smooth, adding water as needed to achieve desired consistency.',
      'Season with salt to taste.',
      'Transfer to a serving bowl, drizzle with olive oil, and sprinkle with paprika and chopped parsley.',
      'Serve with pita bread, vegetable sticks, or crackers.'
    ],
    notes: 'For extra smooth hummus, remove the skins from the chickpeas before processing. For variations, try adding roasted red peppers, sun-dried tomatoes, or extra garlic.',
    user_id: '1',
    created_at: '2025-03-12T14:50:00Z'
  }
];

// Helper function to get recipes by category
export const getRecipesByCategory = (category: Category): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

// Helper function to get recipes by user
export const getRecipesByUser = (userId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.user_id === userId);
};

// Helper function to search recipes
export const searchRecipes = (query: string): Recipe[] => {
  const lowerCaseQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowerCaseQuery) || 
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery)) ||
    recipe.notes?.toLowerCase().includes(lowerCaseQuery)
  );
};

// Helper function to get a recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

// Helper function to get featured recipes (most recent)
export const getFeaturedRecipes = (count: number = 4): Recipe[] => {
  return [...recipes]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, count);
};