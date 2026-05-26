import { API_URL } from './constants';

const BASE = `${API_URL}/articles`;

export const getArticles = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
};

export const getArticle = async (name) => {
  const res = await fetch(`${BASE}/${name}`);
  if (!res.ok) throw new Error('Article not found');
  return res.json();
};

export const createArticle = async (data) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create article');
  return res.json();
};

export const updateArticle = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update article');
  return res.json();
};

export const toggleArticleStatus = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle-status`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to toggle status');
  return res.json();
};