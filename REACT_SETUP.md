# React Integration with Rails

This Rails app has been set up to use React 18 via **importmap-rails**, which is the modern Rails way to integrate JavaScript libraries without Node.js or npm.

## What Was Set Up

### 1. React Dependencies
React and React-DOM have been pinned in `config/importmap.rb`:
- React 18.3.1
- React-DOM 18.3.1
- Scheduler 0.23.2 (React dependency)

All libraries are loaded from CDN (jsDelivr) as ES modules.

### 2. Component Directory
- Created `app/javascript/components/` directory for React components
- Components are automatically pinned via `pin_all_from` in importmap config

### 3. Demo Page
- Controller: `app/controllers/pages_controller.rb`
- View: `app/views/pages/demo.html.erb`
- Component: `app/javascript/components/demo.js`
- Route: Set as root path (`/`)

## How to Use

### Viewing the Demo
1. Start the Rails server:
   ```bash
   bin/rails server
   ```

2. Visit http://localhost:3000

3. You should see a React component with:
   - An interactive counter
   - Styled buttons
   - State management working

### Creating New React Components

1. **Create a new component file** in `app/javascript/components/`:
   ```javascript
   // app/javascript/components/my_component.js
   import React, { useState } from "react";
   import ReactDOM from "react-dom/client";
   
   const { createElement: h } = React;
   
   function MyComponent() {
     return h('div', null, 'Hello from React!');
   }
   
   document.addEventListener("DOMContentLoaded", () => {
     const root = document.getElementById("my-component-root");
     if (root) {
       ReactDOM.createRoot(root).render(h(MyComponent));
     }
   });
   ```

2. **Add a mount point in your view**:
   ```erb
   <% content_for :head do %>
     <%= javascript_importmap_tags "components/my_component" %>
   <% end %>
   
   <div id="my-component-root"></div>
   ```

### Important Notes

#### No JSX Support
Importmap doesn't support JSX out of the box. Use `React.createElement()` instead:

```javascript
// Instead of JSX:
// <div className="card">
//   <h1>Title</h1>
// </div>

// Use createElement:
const { createElement: h } = React;
h('div', { className: 'card' }, [
  h('h1', null, 'Title')
]);
```

#### Component Hot Reloading
Changes to JavaScript files are automatically picked up. Just refresh your browser to see updates.

#### Turbo Compatibility
The demo uses `DOMContentLoaded` event which works with Turbo. For Turbo Drive navigation, you may want to use:
```javascript
document.addEventListener("turbo:load", () => {
  // mount your React component
});
```

## Adding More React Libraries

To add additional React libraries (like React Router), use the importmap command:

```bash
bin/importmap pin react-router-dom
```

Or manually add to `config/importmap.rb`:
```ruby
pin "react-router-dom", to: "https://cdn.jsdelivr.net/npm/react-router-dom@6.22.0/+esm"
```

## Why This Approach?

- ✅ **No build step required** - Rails serves JavaScript directly
- ✅ **No Node.js or npm needed** - Everything via importmap
- ✅ **Fast development** - No bundler compilation time
- ✅ **Modern Rails way** - Uses Rails 8's default JavaScript approach
- ✅ **HTTP/2 friendly** - Multiple small files load efficiently
- ✅ **CDN benefits** - Libraries cached across sites

## Alternative Approaches

If you need JSX support or more complex JavaScript tooling, consider:
- **jsbundling-rails** with esbuild (for JSX support)
- **shakapacker** (for webpack)
- **react-rails gem** (for Rails-specific React integration)

But for many applications, importmap with `createElement` is simpler and sufficient!

