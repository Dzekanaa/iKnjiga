import { NavBar, Footer, NotFound } from "./layout";
import { Home, MyLibrary, LogIn, Register, Profile } from "./pages";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="mylibrary" element={<MyLibrary />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<LogIn />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
