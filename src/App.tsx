import { NavBar, Footer, NotFound } from "./layout";
import { Home, MyLibrary, LogIn, Register, Profile } from "./pages";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { homeLoader } from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} loader={homeLoader} />
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
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}

export default App;
