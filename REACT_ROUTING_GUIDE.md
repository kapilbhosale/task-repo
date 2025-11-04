# React Routing Guide

## App Structure

Your Rails app now has a full React SPA with routing! Here's how it's organized:

### Entry Point
- **`app/javascript/components/demo.js`** - Main entry point that sets up React Router and renders the app

### Components
- **`Navigation.js`** - Top navigation menu with links
- **`HomePage.js`** - Home page with interactive counter demo
- **`ProductsPage.js`** - Products listing page with filtering

### Routes
- `/` - Home page
- `/products` - Products list page

## How It Works

### 1. React Router Setup
React Router DOM is loaded via CDN through importmap:
```ruby
# config/importmap.rb
pin "react-router-dom", to: "https://cdn.jsdelivr.net/npm/react-router-dom@6.22.0/+esm"
pin "react-router", to: "https://cdn.jsdelivr.net/npm/react-router@6.22.0/+esm"
pin "@remix-run/router", to: "https://cdn.jsdelivr.net/npm/@remix-run/router@1.15.0/+esm"
```

### 2. App Structure
```javascript
<BrowserRouter>
  <Navigation />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Routes>
</BrowserRouter>
```

### 3. Navigation
The Navigation component uses `Link` from react-router-dom for client-side navigation:
```javascript
import { Link } from "react-router-dom";

h(Link, { to: '/products' }, 'Products')
```

## Adding New Pages

### Step 1: Create a new component
```javascript
// app/javascript/components/AboutPage.js
import React from "react";
const { createElement: h } = React;

export function AboutPage() {
  return h('div', { className: 'container mx-auto p-8' }, 
    h('h1', { className: 'text-4xl font-bold' }, 'About Us')
  );
}
```

### Step 2: Add route in demo.js
```javascript
import { AboutPage } from "./AboutPage.js";

// In the Routes component:
h(Route, {
  key: 'about',
  path: '/about',
  element: h(AboutPage)
})
```

### Step 3: Add navigation link
```javascript
// In Navigation.js
h(Link, {
  to: '/about',
  className: 'text-gray-700 hover:text-purple-600 font-medium'
}, 'About')
```

## Features Included

### Navigation Menu
- Brand logo/name
- Navigation links (Home, Products)
- Cart button (placeholder)
- Responsive design with Tailwind

### Products Page
- Product grid layout
- Category filtering (All, Electronics, Accessories, Home, Fitness)
- Product cards with:
  - Emoji icons
  - Product name & price
  - Category badge
  - Add to Cart button
- Responsive grid (1-4 columns based on screen size)

### Home Page
- Hero section with call-to-action
- Interactive counter demo
- Feature cards
- Gradient background

## Styling with Tailwind

All components use Tailwind CSS utility classes:
- `bg-purple-600` - Purple background
- `hover:bg-purple-700` - Hover state
- `text-white` - White text
- `rounded-lg` - Rounded corners
- `shadow-md` - Medium shadow
- `transition-all` - Smooth transitions

## Tips

### 1. Using React.createElement without JSX
```javascript
// Instead of: <div className="container">Hello</div>
h('div', { className: 'container' }, 'Hello')

// With children array:
h('div', { className: 'container' }, [
  h('h1', { key: 'title' }, 'Title'),
  h('p', { key: 'text' }, 'Paragraph')
])
```

### 2. Component Exports
Always export your components:
```javascript
export function MyComponent() { ... }
```

### 3. Importing Components
```javascript
import { MyComponent } from "./MyComponent.js";
```

### 4. Client-Side Navigation
Use `Link` for internal navigation to avoid page reloads:
```javascript
import { Link } from "react-router-dom";
h(Link, { to: '/path' }, 'Click Me')
```

## Running the App

Start the development server with Tailwind CSS watch:
```bash
bin/dev
```

This starts:
- Rails server on http://localhost:3000
- Tailwind CSS watcher for automatic rebuilds

## Next Steps

Some ideas for extending the app:
1. Add a shopping cart with state management
2. Create product detail pages
3. Add user authentication
4. Implement search functionality
5. Add pagination to products
6. Create checkout flow
7. Add API integration for real products

Enjoy building your React + Rails app! 🚀

