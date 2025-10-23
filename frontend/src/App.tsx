import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import CoursesPage from "@/pages/courses";
import SignUp from "@/pages/sign-up";
import SignIn from "@/pages/sign-in";
import CourseDetails from "@/pages/course-details";
import CreateCourse from "@/pages/create-course";
import EditCourse from "@/pages/edit-course";
import UserProfile from "@/pages/user-profile";
import UserLoggedIn from "@/components/user-logged-in";
import ProtectedRoute from "@/components/protected-route";
import NotFound from "@/components/not-found";
import ErrorPage from "@/components/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "courses/create",
            element: <CreateCourse />,
          },
          {
            path: "courses/:id/edit",
            element: <EditCourse />,
          },
          {
            path: "user-profile",
            element: <UserProfile />,
          },
        ],
      },
      {
        element: <UserLoggedIn />,
        children: [
          {
            path: "sign-up",
            element: <SignUp />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
