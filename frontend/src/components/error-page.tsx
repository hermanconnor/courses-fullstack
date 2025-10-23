import { useState } from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  RefreshCcw,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ErrorPage() {
  const [showStack, setShowStack] = useState<boolean>(false);
  const error = useRouteError();
  const navigate = useNavigate();

  // Only show stack traces in development
  const isDevelopment = import.meta.env.DEV;

  const handleReload = () => {
    window.location.reload();
  };

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <AlertCircle className="mx-auto size-16 text-red-500 sm:size-20" />
            <h1 className="mt-4 text-5xl font-bold text-red-500 sm:text-6xl">
              {error.status}
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">
              {error.statusText || "Something went wrong"}
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Sorry, we encountered an error while processing your request.
            </p>

            {error.data && (
              <div className="mt-4 rounded-md bg-gray-50 p-4 text-left">
                <p className="text-sm break-words text-gray-700">
                  {error.data}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleReload}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
              >
                <RefreshCcw className="size-4" /> Reload Page
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Home className="size-4" /> Go Back Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <AlertCircle className="mx-auto size-16 text-yellow-500 sm:size-20" />
            <h1 className="mt-4 text-4xl font-bold text-yellow-600 sm:text-5xl">
              Error
            </h1>
            <h2 className="mt-4 text-xl font-semibold break-words text-gray-800 sm:text-2xl">
              {isDevelopment ? error.message : "Something went wrong"}
            </h2>

            {isDevelopment && error.stack && (
              <div className="mt-6">
                <button
                  onClick={() => setShowStack(!showStack)}
                  className="mx-auto flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {showStack ? (
                    <>
                      <ChevronUp className="size-4" /> Hide Stack Trace
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4" /> Show Stack Trace
                    </>
                  )}
                </button>

                {showStack && (
                  <div className="mt-4 max-h-96 overflow-auto rounded-md bg-gray-900 p-4 text-left">
                    <pre className="text-xs break-words whitespace-pre-wrap text-gray-100 sm:text-sm">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {!isDevelopment && (
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Please try again later or contact support if the problem
                persists.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleReload}
                className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600"
              >
                <RefreshCcw className="size-4" /> Reload Page
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Home className="size-4" /> Go Back Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <AlertCircle className="mx-auto size-16 text-red-500 sm:size-20" />
            <h1 className="mt-4 text-5xl font-bold text-red-500 sm:text-6xl">
              Oops!
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">
              An unknown error occurred
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Sorry, we encountered an unexpected error. Please try again later.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleReload}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
              >
                <RefreshCcw className="size-4" /> Reload Page
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Home className="size-4" /> Go Back Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
