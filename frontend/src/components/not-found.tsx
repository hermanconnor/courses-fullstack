import { Link } from "react-router";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <XCircle className="mx-auto h-20 w-20 text-red-500" /> {/* Icon */}
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="mt-4 cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
