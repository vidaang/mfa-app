import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1>404 — Page Not Found</h1>
      <p>Uh oh! The page you're looking for doesn't exist.</p>
      <Link to="/">Return to sign in</Link>
    </div>
  );
}
