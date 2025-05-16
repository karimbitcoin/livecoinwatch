import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-3xl font-semibold text-primary">Page Not Found</p>
      <p className="mt-4 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex items-center btn-primary">
        <FiArrowLeft className="mr-2" /> Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
