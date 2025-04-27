'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Link {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  categoryId: number;
}

interface LinkManagerContextType {
  categories: Category[];
  links: Link[];
  viewMode: 'grid' | 'list';
  selectedCategory: number | null;
  addLink: (url: string, categoryId: number) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  deleteLink: (id: number) => Promise<void>;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSelectedCategory: (id: number | null) => void;
  searchLinks: (query: string) => void;
}

const LinkManagerContext = createContext<LinkManagerContextType | undefined>(undefined);

export function LinkManagerProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchLinks();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data.sort((a: Category, b: Category) => a.name.localeCompare(b.name)));
  };

  const fetchLinks = async () => {
    const response = await fetch('/api/links');
    const data = await response.json();
    setLinks(data);
  };

  const addLink = async (url: string, categoryId: number) => {
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, categoryId }),
    });
    const newLink = await response.json();
    setLinks([...links, newLink]);
  };

  const addCategory = async (name: string) => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newCategory = await response.json();
    const updatedCategories = [...categories, newCategory].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    setCategories(updatedCategories);
  };

  const deleteCategory = async (id: number) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(category => category.id !== id));
  };

  const deleteLink = async (id: number) => {
    await fetch(`/api/links/${id}`, { method: 'DELETE' });
    setLinks(links.filter(link => link.id !== id));
  };

  const searchLinks = (query: string) => {
    setSearchQuery(query);
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = !searchQuery || 
      link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || link.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <LinkManagerContext.Provider value={{
      categories,
      links: filteredLinks,
      viewMode,
      selectedCategory,
      addLink,
      addCategory,
      deleteCategory,
      deleteLink,
      setViewMode,
      setSelectedCategory,
      searchLinks,
    }}>
      {children}
    </LinkManagerContext.Provider>
  );
}

export const useLinkManager = () => {
  const context = useContext(LinkManagerContext);
  if (context === undefined) {
    throw new Error('useLinkManager must be used within a LinkManagerProvider');
  }
  return context;
};