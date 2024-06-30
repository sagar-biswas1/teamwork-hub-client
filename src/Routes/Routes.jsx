import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import CollaborativeEditor from "../pages/CollaborativeEditor";
import NotFound from "../pages/NotFound";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/signup", element: <Registration></Registration> },
      {
        path: "/collaborate/:projectId",
        element: (
          <PrivateRoute>
            {" "}
            <CollaborativeEditor></CollaborativeEditor>{" "}
          </PrivateRoute>
        ),
      },
      { path: "/*", element: <NotFound></NotFound> },
    ],
  },
]);
