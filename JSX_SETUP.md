# JSX Setup Complete! 🎉

Your Rails app now has **full JSX support** with esbuild!

## What Changed

### Before (createElement):
```javascript
const { createElement: h } = React;

h('div', { className: 'container' }, [
  h('h1', null, 'Title'),
  h('button', { onClick: handleClick }, 'Click Me')
])
```

### After (JSX):
```jsx
<div className="container">
  <h1>Title</h1>
  <button onClick={handleClick}>Click Me</button>
</div>
```

## Tech Stack

- ✅ **React 19** with JSX
- ✅ **React Router DOM 7** for routing
- ✅ **esbuild** for fast JavaScript bundling
- ✅ **Tailwind CSS v4** for styling
- ✅ **Rails 8** backend

## File Structure

```
app/javascript/
├── application.js        # Entry point
└── components/
    ├── App.jsx           # Main app with routing
    ├── Navigation.jsx    # Top navigation
    ├── HomePage.jsx      # Home page
    └── ProductsPage.jsx  # Products listing
```

## Development Workflow

### Starting the Server
```bash
bin/dev
```

This starts 3 processes:
- **Rails server** (port 3000)
- **Tailwind CSS watcher** (auto-rebuilds CSS)
- **esbuild watcher** (auto-bundles JavaScript)

### Creating New Components

1. Create a new `.jsx` file in `app/javascript/components/`:

```jsx
// app/javascript/components/MyComponent.jsx
import React from "react";

export default function MyComponent() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Hello!</h1>
    </div>
  );
}
```

2. Import it where needed:

```jsx
import MyComponent from "./MyComponent";

// Use it:
<MyComponent />
```

### Adding Routes

In `App.jsx`:

```jsx
import NewPage from "./NewPage";

// Add to Routes:
<Route path="/new" element={<NewPage />} />
```

### Using React Hooks

All hooks work normally:

```jsx
import React, { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data, etc.
  }, []);
  
  return <div>{/* Your JSX */}</div>;
}
```

### Styling with Tailwind

Just use className with Tailwind utilities:

```jsx
<div className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
  Beautiful Button
</div>
```

## How It Works

### Build Process
1. esbuild reads `app/javascript/application.js`
2. Bundles all imports and dependencies
3. Transpiles JSX to JavaScript
4. Outputs to `app/assets/builds/application.js`
5. Rails serves it via the asset pipeline

### Auto-Rebuild
When you save any `.jsx` file, esbuild automatically:
- Re-bundles your code
- Updates the browser (with page refresh)

## Adding npm Packages

```bash
yarn add package-name
```

Then import normally:
```jsx
import Something from 'package-name';
```

## Common React Patterns

### State Management
```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>
```

### Event Handlers
```jsx
function handleSubmit(e) {
  e.preventDefault();
  // Handle form
}

<form onSubmit={handleSubmit}>
  {/* ... */}
</form>
```

### Conditional Rendering
```jsx
{isLoggedIn ? (
  <UserProfile />
) : (
  <LoginButton />
)}
```

### Lists
```jsx
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

## Debugging

### Check Build Errors
If something doesn't work, check the terminal where `bin/dev` is running for esbuild errors.

### Browser Console
Open browser DevTools (F12) to see React errors and logs.

### Source Maps
esbuild generates source maps, so you can debug your original JSX code in the browser.

## Performance

esbuild is extremely fast:
- Initial build: ~200ms
- Rebuild on change: ~50ms

The bundle size shown (~1.1mb) includes:
- React 19
- React Router
- All your components

In production, Rails will compress and cache this effectively.

## Production Deployment

When deploying, Rails will automatically:
1. Run `yarn build` (production build)
2. Precompile assets
3. Serve optimized, cached bundles

## Next Steps

Some ideas:
- Add more pages and routes
- Create reusable components
- Add state management (Context API, Zustand, etc.)
- Connect to Rails API endpoints
- Add form handling
- Implement authentication

Enjoy coding with real JSX! 🚀

