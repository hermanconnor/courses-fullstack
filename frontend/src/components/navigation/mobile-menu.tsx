import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { BookOpen, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { authUser, signOut } = useAuth();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const activeStyles = "bg-blue-50 text-blue-600";
  const baseStyles = "text-gray-700 hover:text-blue-600 hover:bg-gray-50";
  const defaultStyles =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="size-6 text-blue-600" />
              <span className="text-sm font-bold text-gray-900">CourseHub</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col space-y-4">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              cn(isActive ? activeStyles : baseStyles, defaultStyles)
            }
            onClick={handleLinkClick}
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
              onClick={handleLinkClick}
            >
              Create Course
            </NavLink>
          ) : null}

          <Separator className="my-3" />

          <div className="flex flex-col space-y-4 pl-1">
            {authUser && authUser.id ? (
              <>
                <NavLink
                  to="user-profile"
                  className={({ isActive }) =>
                    cn(isActive ? activeStyles : baseStyles, defaultStyles)
                  }
                  onClick={handleLinkClick}
                >
                  Profile
                </NavLink>

                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    signOut();
                    handleLinkClick();
                    navigate("/sign-in", { replace: true });
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
                    cn(isActive ? activeStyles : baseStyles, defaultStyles)
                  }
                  onClick={handleLinkClick}
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/sign-up"
                  className={({ isActive }) =>
                    cn(isActive ? activeStyles : baseStyles, defaultStyles)
                  }
                  onClick={handleLinkClick}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
