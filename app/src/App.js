import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import './App.css';
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
    const handleBeforeUnload = (e) => {
      try {
        const inputs = document.querySelectorAll('input, textarea, select');
        let hasValue = false;
        inputs.forEach((el) => {
          if (!el.disabled && el.type !== 'hidden' && el.value) hasValue = true;
        });
        if (hasValue) {
          e.preventDefault();
          e.returnValue = '';
        }
      } catch (err) {
        // ignore
      }
    };

    const isReload = () => {
      try {
        const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
        if (navEntries && navEntries[0] && navEntries[0].type === 'reload') return true;
        // fallback for older browsers
        // @ts-ignore
        if (performance && performance.navigation && performance.navigation.type === 1) return true;
      } catch (err) {}
      return false;
    };

    if (isReload()) {
      try { clearCurrentUser(); } catch (err) {}
      // redirect back to root after clearing user data
      window.location.href = '/';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
