import users from '../data/mockUserData.json';

const STORAGE_KEY = 'mfa_current_user_v1';
let currentUser = null;

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

export function setCurrentUserByEmail(email) {
  if (!email) return null;
  const user = users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const userInfo = { id: user.id, name: user.name, email: user.email, role: user.role };
  setCurrentUser(userInfo);
  return userInfo;
}

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

export function clearCurrentUser() {
  currentUser = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

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
