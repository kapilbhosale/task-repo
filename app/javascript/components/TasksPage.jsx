import React from "react";

export default function TasksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Task 
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Requirements</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-lg">
            <li>Understand properly the current codebase.</li>
            <li>Add a new page on UI (react side) for Products.</li>
            <li>We want to do CRUD operation for Products.</li>
            <li>Add a table on the products page to show all products.</li>
            <li>I must be able to view a single product details.</li>
            <li>I must be able to edit a product details.</li>
            <li>I must be able to delete a product.</li>
            <li>I must be able to add a new product.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nice to Have</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-lg">
            <li>Pagination on the products page.</li>
            <li>Search functionality on the products page.</li>
            <li>Sorting functionality on the products page.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Backend (Rails)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
            <li>You need to add API's for the products.</li>
            <li>Create a new model for Products.</li>
            <li>Add Initial products from the seed file.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

