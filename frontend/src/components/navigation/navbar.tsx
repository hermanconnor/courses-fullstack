import { Link, NavLink, useNavigate } from "react-router";
import { BookOpen, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/navigation/mobile-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, signOut } = useAuth();

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

            {authUser && authUser.id ? (
              <NavLink
                end
                to="/courses/create"
                className={({ isActive }) =>
                  cn(isActive ? activeStyles : baseStyles, defaultStyles)
                }
              >
                Create Course
              </NavLink>
            ) : null}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {authUser && authUser.id ? (
              <>
                <Link to="user-profile">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <User className="mr-1 size-4" />
                    Profile
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    signOut();
                    navigate("/sign-in");
                  }}
                >
                  <LogOut className="mr-1 size-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* MOBILE MENU */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
