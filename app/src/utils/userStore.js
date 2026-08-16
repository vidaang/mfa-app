// Lightweight client-side user store: persists current user to localStorage
import users from '../data/mockUserData.json';

const STORAGE_KEY = 'mfa_current_user_v1';
let currentUser = null;

// Set the current user in memory and persist to localStorage (if available)
export function setCurrentUser(user) {
  currentUser = user || null;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    // ignore localStorage errors (e.g. SSR or disabled storage)
  }
}

// Lookup a user by email from mock data and set as current user
export function setCurrentUserByEmail(email) {
  if (!email) return null;
  const user = users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const userInfo = { id: user.id, name: user.name, email: user.email, role: user.role };
  setCurrentUser(userInfo);
  return userInfo;
}

// Retrieve the current user from memory or localStorage
export function getCurrentUser() {
  if (currentUser) return currentUser;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      currentUser = JSON.parse(raw);
      return currentUser;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

// Clear current user from memory and localStorage
export function clearCurrentUser() {
  currentUser = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

// Convenience: return current user's email or null
export function getCurrentUserEmail() {
  const u = getCurrentUser();
  return u?.email || null;
}

export default {
  setCurrentUser,
  setCurrentUserByEmail,
  getCurrentUser,
  clearCurrentUser,
  getCurrentUserEmail,
};
