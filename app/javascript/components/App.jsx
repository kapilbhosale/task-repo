import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import TasksPage from "./TasksPage";
import ProductsPage from "./ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Mount the React app
function mountApp() {
  console.log('Attempting to mount React app...');
  const root = document.getElementById("react-root");
  
  if (!root) {
    console.error('React root element not found!');
    return;
  }
  
  if (root.dataset.reactMounted) {
    console.log('React app already mounted');
    return;
  }
  
  try {
    console.log('Mounting React app...');
    root.dataset.reactMounted = 'true';
    ReactDOM.createRoot(root).render(<App />);
    console.log('React app mounted successfully!');
  } catch (error) {
    console.error('Error mounting React app:', error);
  }
}

// Try mounting immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}

export default App;
