'use client';

import { useState } from 'react';
import { useLinkManager } from './contexts/LinkManagerContext';
import { FiGrid, FiList, FiPlus, FiSearch } from 'react-icons/fi';

export default function Home() {
  const {
    categories,
    links,
    viewMode,
    selectedCategory,
    setViewMode,
    setSelectedCategory,
    addCategory,
    addLink,
    searchLinks,
  } = useLinkManager();

  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    
    await addLink(newUrl, selectedCategory || 1); // Use 1 for Miscellaneous if no category selected
    setNewUrl('');
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    
    await addCategory(newCategory);
    setNewCategory('');
    setShowNewCategoryInput(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowNewCategoryInput(true)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <FiPlus /> Add Category
          </button>
        </div>

        {showNewCategoryInput && (
          <form onSubmit={handleAddCategory} className="mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="w-full p-2 border rounded"
            />
          </form>
        )}

        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedCategory === null ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            All Links
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedCategory === category.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="mb-8 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search links..."
                onChange={(e) => searchLinks(e.target.value)}
                className="w-full p-3 pl-10 border rounded"
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        {/* Add new link form */}
        <form onSubmit={handleAddLink} className="mb-8">
          <div className="flex gap-4">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter URL to add"
              className="flex-1 p-3 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <FiPlus /> Add Link
            </button>
          </div>
        </form>

        {/* Links display */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
          {links.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-lg shadow ${
                viewMode === 'grid' ? 'p-4' : 'p-4 flex gap-4'
              }`}
            >
              {link.thumbnail && (
                <img
                  src={link.thumbnail}
                  alt={link.title || link.url}
                  className={viewMode === 'grid' ? 'w-full h-40 object-cover mb-4' : 'w-24 h-24 object-cover'}
                />
              )}
              <div>
                <h3 className="font-semibold text-lg mb-2">{link.title || 'Untitled'}</h3>
                {link.description && (
                  <p className="text-gray-600 text-sm mb-2">{link.description}</p>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  {link.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
