import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login/LoginPage';
import SignUp from '../pages/SignUp/SignUpPage';
import MultiFactor from '../pages/MultiFactorAuth/MultiFactorAuthPage';
import Dashboard from '../pages/Dashboard/DashboardPage';
import NotFound from '../pages/NotFound/NotFoundPage';

test('unknown route renders 404 page', () => {
  const routes = [
    { path: '/', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/mfa', element: <MultiFactor /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/no-such-page'] });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/404 — Page Not Found/i)).toBeInTheDocument();
});
