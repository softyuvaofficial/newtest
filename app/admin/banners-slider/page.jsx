"use client";

import { useState, useEffect } from "react";

export default function BannersSliderAdminPage() {
  // Example banners state (replace with fetch from DB)
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Welcome to TestYukti",
      description: "Your gateway to success",
      imageUrl: "https://via.placeholder.com/600x200?text=Banner+1",
      isActive: true,
    },
    {
      id: 2,
      title: "Join Live Tests",
      description: "Compete with top students",
      imageUrl: "https://via.placeholder.com/600x200?text=Banner+2",
      isActive: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload banner (simulate upload)
  const handleUpload = () => {
    if (!title || !description || !imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setUploading(true);

    // Simulate image upload & DB save
    setTimeout(() => {
      const newBanner = {
        id: banners.length + 1,
        title,
        description,
        imageUrl: URL.createObjectURL(imageFile),
        isActive: false,
      };
      setBanners([...banners, newBanner]);
      setTitle("");
      setDescription("");
      setImageFile(null);
      setUploading(false);
    }, 1500);
  };

  // Toggle banner active status
  const toggleActive = (id) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );
  };

  // Delete banner
  const deleteBanner = (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Manage Banners & Slider</h1>

      {/* Upload New Banner */}
      <section className="mb-12 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Banner</h2>
        <div className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Banner Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Banner Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Banner"}
          </button>
        </div>
      </section>

      {/* Existing Banners */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
        {banners.length === 0 ? (
          <p>No banners uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map(({ id, title, description, imageUrl, isActive }) => (
              <div
                key={id}
                className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-4"
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full md:w-48 rounded object-cover"
                  height={120}
                  width={200}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleActive(id)}
                        className="form-checkbox text-indigo-600"
                      />
                      <span>Show in Slider</span>
                    </label>
                    <button
                      onClick={() => deleteBanner(id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
