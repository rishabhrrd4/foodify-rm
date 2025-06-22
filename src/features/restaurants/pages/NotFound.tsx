import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-center mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

