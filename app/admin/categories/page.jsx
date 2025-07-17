"use client";

import { useState } from "react";

export default function CategoriesAdminPage() {
  // Mock data for categories with subcategories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "SSC",
      subcategories: [
        { id: 11, name: "CGL" },
        { id: 12, name: "MTS" },
      ],
    },
    {
      id: 2,
      name: "Banking",
      subcategories: [
        { id: 21, name: "IBPS PO" },
        { id: 22, name: "SBI Clerk" },
      ],
    },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcatName, setNewSubcatName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Add new category
  const addCategory = () => {
    if (!newCategoryName.trim()) return alert("Enter category name");
    const exists = categories.find(
      (cat) => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase()
    );
    if (exists) return alert("Category already exists");

    const newCat = {
      id: Date.now(),
      name: newCategoryName.trim(),
      subcategories: [],
    };
    setCategories([...categories, newCat]);
    setNewCategoryName("");
  };

  // Add subcategory
  const addSubcategory = () => {
    if (!selectedCategoryId) return alert("Select a category first");
    if (!newSubcatName.trim()) return alert("Enter subcategory name");

    setCategories(
      categories.map((cat) => {
        if (cat.id === selectedCategoryId) {
          // Check duplicate
          if (
            cat.subcategories.find(
              (sub) =>
                sub.name.toLowerCase() === newSubcatName.trim().toLowerCase()
            )
          ) {
            alert("Subcategory already exists");
            return cat;
          }
          return {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              { id: Date.now(), name: newSubcatName.trim() },
            ],
          };
        }
        return cat;
      })
    );
    setNewSubcatName("");
  };

  // Delete category
  const deleteCategory = (id) => {
    if (confirm("Are you sure to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      if (selectedCategoryId === id) setSelectedCategoryId(null);
    }
  };

  // Delete subcategory
  const deleteSubcategory = (catId, subId) => {
    if (confirm("Are you sure to delete this subcategory?")) {
      setCategories(
        categories.map((cat) =>
          cat.id === catId
            ? {
                ...cat,
                subcategories: cat.subcategories.filter((sub) => sub.id !== subId),
              }
            : cat
        )
      );
    }
  };

  // Edit category or subcategory (simple prompt for demo)
  const editCategory = (id) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const newName = prompt("Edit category name:", cat.name);
    if (newName && newName.trim()) {
      setCategories(
        categories.map((c) => (c.id === id ? { ...c, name: newName.trim() } : c))
      );
    }
  };

  const editSubcategory = (catId, subId) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return;
    const subcat = cat.subcategories.find((s) => s.id === subId);
    if (!subcat) return;
    const newName = prompt("Edit subcategory name:", subcat.name);
    if (newName && newName.trim()) {
      setCategories(
        categories.map((c) =>
          c.id === catId
            ? {
                ...c,
                subcategories: c.subcategories.map((s) =>
                  s.id === subId ? { ...s, name: newName.trim() } : s
                ),
              }
            : c
        )
      );
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Manage Categories & Subcategories</h1>

      {/* Add New Category */}
      <section className="mb-8 bg-white p-6 rounded shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addCategory}
            className="bg-indigo-600 text-white px-5 rounded hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </section>

      {/* Add Subcategory */}
      <section className="mb-12 bg-white p-6 rounded shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
        <div className="flex flex-col space-y-3">
          <select
            value={selectedCategoryId || ""}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Subcategory name"
            value={newSubcatName}
            onChange={(e) => setNewSubcatName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addSubcategory}
            className="bg-indigo-600 text-white px-5 rounded hover:bg-indigo-700 transition"
          >
            Add Subcategory
          </button>
        </div>
      </section>

      {/* Categories List */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Categories & Subcategories</h2>
        {categories.length === 0 ? (
          <p>No categories added yet.</p>
        ) : (
          <div className="space-y-6 max-w-3xl">
            {categories.map(({ id, name, subcategories }) => (
              <div key={id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <div className="space-x-3">
                    <button
                      onClick={() => editCategory(id)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                {subcategories.length === 0 ? (
                  <p className="text-gray-500">No subcategories.</p>
                ) : (
                  <ul className="pl-5 list-disc space-y-1">
                    {subcategories.map(({ id: subId, name: subName }) => (
                      <li key={subId} className="flex justify-between items-center">
                        <span>{subName}</span>
                        <div className="space-x-3">
                          <button
                            onClick={() => editSubcategory(id, subId)}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteSubcategory(id, subId)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
