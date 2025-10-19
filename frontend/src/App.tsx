import { Routes, Route } from "react-router";
import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import SignUp from "@/pages/sign-up";
import SignIn from "@/pages/sign-in";
import CourseDetails from "@/pages/course-details";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
