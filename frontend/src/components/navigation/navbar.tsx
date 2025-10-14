import { BookOpen, LogIn } from "lucide-react";
import { Link, NavLink } from "react-router";
import MobileMenu from "@/components/navigation/mobile-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const activeStyles = "bg-blue-50 text-blue-600";
  const baseStyles = "text-gray-700 hover:text-blue-600 hover:bg-gray-50";
  const defaultStyles =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors";

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* DESKTOP NAVIGATION */}
        <nav className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="size-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CourseHub</span>
          </Link>

          <div className="hidden space-x-8 md:flex">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                cn(isActive ? activeStyles : baseStyles, defaultStyles)
              }
            >
              Courses
            </NavLink>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                cn(
                  isActive ? activeStyles : baseStyles,
                  defaultStyles,
                  "flex items-center justify-center",
                )
              }
            >
              <LogIn className="mr-1 size-4" />
              Sign In
            </NavLink>

            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                cn(isActive ? activeStyles : baseStyles, defaultStyles)
              }
            >
              Sign Up
            </NavLink>
          </div>

          {/* MOBILE MENU */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
