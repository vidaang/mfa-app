import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { clearCurrentUser } from './utils/userStore';

class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    console.error('Uncaught error:', error);
    try {
      window.location.href = '/404';
    } catch (e) {
      // fallback no-op
    }
  }
  render() {
    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    const isPageRefresh = () => {
      try {
        const navEntries = performance.getEntriesByType?.('navigation');
        if (navEntries && navEntries[0] && navEntries[0].type === 'reload') {
          return true;
        }

        // fallback for older browsers
        // @ts-ignore
        if (performance && performance.navigation && performance.navigation.type === 1) {
          return true;
        }
      } catch (err) {
        // ignore
      }

      return false;
    };

    if (isPageRefresh()) {
      try {
        clearCurrentUser();
      } catch (err) {
        // ignore
      }

      // Only a genuine browser refresh should trigger this redirect.
      window.location.replace('/');
    }
  }, []);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
