import { NavBar, Footer, NotFound } from "./layout";
import { Home, MyLibrary, LogIn, Profile } from "./pages";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="mylibrary" element={<MyLibrary />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <RouterProvider router={router} />
      <Footer /> */}
      <LogIn />
    </>
  );
}

export default App;
