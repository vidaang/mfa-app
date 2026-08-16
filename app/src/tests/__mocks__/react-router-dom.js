import React from 'react';

// Minimal in-memory router mock to satisfy tests that use createMemoryRouter + RouterProvider
export function createMemoryRouter(routes, options = {}) {
  const initial = (options.initialEntries && options.initialEntries[0]) || '/';
  return { routes, initialEntry: initial };
}

export function createBrowserRouter(routes) {
  return { routes };
}

export function RouterProvider({ router }) {
  // find matching route element by path
  const entry = router && (router.initialEntry || (router.initialEntries && router.initialEntries[0]));
  const match = (router?.routes || []).find((r) => r.path === entry) || (router?.routes || []).find((r) => r.path === '*');
  const Element = match ? match.element : null;
  return Element ? React.createElement(React.Fragment, null, Element) : null;
}

export const Link = ({ to, children, ...rest }) => React.createElement('a', { href: to, ...rest }, children);

export const RouterLink = Link;

export const useNavigate = () => {
  return (to) => {
    // no-op in tests; can be spied via jest.fn in tests that mock this module
    return to;
  };
};

export default {
  createMemoryRouter,
  createBrowserRouter,
  RouterProvider,
  Link,
  RouterLink,
  useNavigate,
};
