import { Routes, Route } from "react-router";
import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import SignUp from "@/pages/sign-up";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
