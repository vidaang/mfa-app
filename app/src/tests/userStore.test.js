import {
  setCurrentUserByEmail,
  getCurrentUser,
  clearCurrentUser,
  setCurrentUser,
} from '../utils/userStore';

describe('userStore helpers', () => {
  afterEach(() => {
    try { clearCurrentUser(); } catch (e) {}
  });

  test('setCurrentUserByEmail sets and returns user info', () => {
    const info = setCurrentUserByEmail('janesmith@company.com');
    expect(info).toBeDefined();
    expect(info.email).toBe('janesmith@company.com');
    const stored = getCurrentUser();
    expect(stored.email).toBe('janesmith@company.com');
  });

  test('clearCurrentUser removes stored user', () => {
    setCurrentUserByEmail('johndoe@company.com');
    expect(getCurrentUser()).not.toBeNull();
    clearCurrentUser();
    expect(getCurrentUser()).toBeNull();
  });

  test('setCurrentUser can accept null and objects', () => {
    setCurrentUser(null);
    expect(getCurrentUser()).toBeNull();
    setCurrentUser({ id: 99, email: 'x@y.com' });
    expect(getCurrentUser().email).toBe('x@y.com');
    clearCurrentUser();
  });
});
