import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    tags: ""
  });
  const [nameExists, setNameExists] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/v1/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const url = editingProduct
        ? `/api/v1/products/${editingProduct.id}`
        : "/api/v1/products";
      const method = editingProduct ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Failed to save product";

        if (errorData.errors) {
          // Format Rails validation errors nicely
          const errors = Array.isArray(errorData.errors) ? errorData.errors : Object.values(errorData.errors).flat();
          errorMessage = errors.join(", ");
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      await fetchProducts();
      resetForm();
      setShowForm(false);

      // Show success message
      setSuccess(editingProduct
        ? `Product "${data.name}" updated successfully!`
        : `Product "${data.name}" created successfully!`
      );

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/v1/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete product");
      }

      const data = await response.json();
      await fetchProducts();
      setSuccess(`Product "${productToDelete.name}" deleted successfully!`);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      tags: product.tags || ""
    });
    setShowForm(true);
  };

  const checkNameExists = (name) => {
    if (!name.trim()) return false;

    // When editing, allow the current product's name
    if (editingProduct && editingProduct.name.toLowerCase() === name.toLowerCase()) {
      return false;
    }

    return products.some(product =>
      product.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({ ...formData, name });
    setNameExists(checkNameExists(name));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      tags: ""
    });
    setEditingProduct(null);
    setNameExists(false);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.tags && product.tags.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === "price" || sortBy === "stock") {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      } else {
        aVal = (aVal || "").toString().toLowerCase();
        bVal = (bVal || "").toString().toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      {/* Search and Sort Controls */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  nameExists
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {nameExists && (
                <p className="mt-1 text-sm text-red-600">
                  Product name already exists. Please choose a different name.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Comma-separated tags"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={nameExists}
                className={`px-4 py-2 rounded-md text-white ${
                  nameExists
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      {product.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.tags && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? "No products found matching your search." : "No products available."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? "text-blue-600 bg-blue-50 border border-blue-500"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Delete Product
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>"{productToDelete.name}"</strong>?
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center px-4 py-3 gap-3">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-900 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
