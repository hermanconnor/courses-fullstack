import { Routes, Route } from "react-router";
import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import SignUp from "@/pages/sign-up";
import SignIn from "@/pages/sign-in";
import CourseDetails from "@/pages/course-details";
import CreateCourse from "@/pages/create-course";
import EditCourse from "@/pages/edit-course";
import UserProfile from "@/pages/user-profile";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/edit" element={<EditCourse />} />
        <Route path="/user-profile" element={<UserProfile />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
