import { Routes, Route } from "react-router";
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

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/edit" element={<EditCourse />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>

        <Route element={<UserLoggedIn />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
