import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard/DashboardPage';
import { setCurrentUserByEmail, clearCurrentUser } from '../utils/userStore';

describe('Dashboard read/write views', () => {
  afterEach(() => {
    try { clearCurrentUser(); } catch (e) {}
  });

  test('shows write actions for READ_WRITE users', () => {
    setCurrentUserByEmail('janesmith@company.com');
    render(<Dashboard />);
    expect(screen.getByText(/Add a new record/i)).toBeInTheDocument();
  });

  test('hides write actions for READ_ONLY users', () => {
    setCurrentUserByEmail('johndoe@company.com');
    render(<Dashboard />);
    expect(screen.queryByText(/Add a new record/i)).toBeNull();
  });
});
