# Replate Me

## 🍽️ Project Overview

This Replate Me application is a modern, responsive web platform for discovering, sharing, and organizing recipes. Built with a focus on user experience and clean design, it allows users to browse recipes by category, search for specific dishes, and maintain their own collection of recipes.

The application features a Material UI interface with intuitive navigation, responsive design for all device sizes, and seamless authentication through Supabase. It's designed to be both functional and visually appealing, making recipe management a delightful experience.

---

## 🛠 Tech Stack

- **Framework**: Next.js 13 (App Router)
- **UI Components**: Material UI v5
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Hooks
- **Styling**: Material UI Theme
- **Deployment**: Static Export (Netlify-ready)

---

## 🚀 Current Features

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Category Browsing**: Browse recipes by categories (breakfast, lunch, dinner, etc.)
- **Recipe Details**: View detailed recipe information including ingredients, directions, and notes
- **Search Functionality**: Search for recipes by title, ingredients, or notes
- **User Authentication**: Sign up and login functionality via Supabase
- **My Recipes**: Personal collection of user-created recipes
- **Create Recipes**: Add new recipes with title, image, ingredients, directions, and notes
- **Sticky Navigation**: Header and search bar remain accessible while scrolling
- **Back Navigation**: Easy navigation between pages

## 🔮 Planned Features

- **Favorites**: Save favorite recipes to a personal collection
- **Ratings & Reviews**: Rate and review recipes
- **Social Sharing**: Share recipes on social media platforms
- **Recipe Editing**: Edit existing recipes
- **Meal Planning**: Plan meals for the week
- **Shopping Lists**: Generate shopping lists from recipes
- **Nutritional Information**: Display nutritional data for recipes
- **Print Friendly**: Printer-friendly recipe pages
- **Dark Mode**: Toggle between light and dark themes
- **Advanced Filtering**: Filter recipes by dietary restrictions, cooking time, etc.

---

## 📌 Project Setup

### 🔧 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/recipe-collection.git
   cd replate-me
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Supabase:
   - Create a Supabase account and project
   - Run the migration scripts in the `supabase/migrations` folder
   - Create a `.env.local` file with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
📦 replate-me
├── 📂 app                # Next.js App Router files
│   ├── 📂 auth           # Authentication pages
│   ├── 📂 category       # Category browsing pages
│   ├── 📂 my-recipes     # User's recipes page
│   ├── 📂 recipes        # Recipe details and creation pages
│   ├── 📂 search         # Search results page
│   ├── 📄 globals.css    # Global styles
│   ├── 📄 layout.tsx     # Root layout component
│   ├── 📄 page.tsx       # Home page component
│   └── 📄 providers.tsx  # Context providers
├── 📂 components         # Reusable UI components
│   ├── 📄 BackButton.tsx # Navigation component
│   ├── 📄 CategoryCard.tsx # Category display component
│   ├── 📄 FeaturedRecipes.tsx # Featured recipes component
│   ├── 📄 Layout.tsx     # Layout wrapper component
│   ├── 📄 RecipeCard.tsx # Recipe card component
│   ├── 📄 SearchBar.tsx  # Search component
│   └── 📄 ThemeProvider.tsx # MUI theme provider
├── 📂 data               # Data sources and mock data
│   └── 📄 fakeData.ts    # Sample recipe data
├── 📂 lib                # Utility functions and clients
│   ├── 📄 supabase.ts    # Supabase client
│   └── 📄 utils.ts       # Helper functions
├── 📂 supabase           # Supabase configuration
│   └── 📂 migrations     # Database migration scripts
├── 📂 types              # TypeScript type definitions
│   └── 📄 index.ts       # Type definitions
├── 📄 .env.local         # Environment variables (not in Git)
├── 📄 next.config.js     # Next.js configuration
└── 📄 package.json       # Project dependencies
```

---

## 📊 Development Roadmap

This project follows a structured development plan. The tasks are grouped into **phases** for better organization and tracking.

### **📌 Phase 1: Core Structure & Data Model (Completed)**

- [x] Set up Next.js project with App Router
- [x] Create responsive layout with Material UI
- [x] Design and implement database schema
- [x] Set up Supabase integration
- [x] Implement basic recipe browsing functionality

### **📌 Phase 2: User Experience & Core Features (Completed)**

- [x] Implement homepage with featured recipes
- [x] Create category browsing experience
- [x] Develop recipe detail pages
- [x] Add search functionality
- [x] Implement user authentication
- [x] Create "My Recipes" section
- [x] Develop recipe creation form

### **📌 Phase 3: Enhanced User Experience (In Progress)**

- [x] Add sticky navigation elements
- [x] Improve responsive design for all device sizes
- [ ] Implement favorites functionality
- [ ] Add ratings and reviews
- [ ] Create user profile pages
- [ ] Implement recipe editing
- [ ] Add image upload functionality

### **📌 Phase 4: Advanced Features (Planned)**

- [ ] Develop meal planning functionality
- [ ] Create shopping list generation
- [ ] Add nutritional information
- [ ] Implement social sharing
- [ ] Create print-friendly recipe pages
- [ ] Add dark mode support
- [ ] Implement advanced filtering and sorting

### **📌 Phase 5: Performance & Deployment (Planned)**

- [ ] Optimize for Core Web Vitals
- [ ] Implement caching strategies
- [ ] Add offline support with PWA features
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production
- [ ] Implement analytics and monitoring

---

## 📸 Screenshots

_(Coming soon)_

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌐 Live Demo

🚀 [Coming soon: Deployed on Netlify]

---

## 📩 Contact

📧 Email: your-email@example.com  
💼 LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)  
🐙 GitHub: [your-github](https://github.com/your-username)
