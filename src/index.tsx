import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import AboutUser from "./pages/AboutUser";
import SinglePost from "./pages/SinglePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts/:numberPage",
        element: <Posts />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />,
      },
      {
        path: "/post/:id/edit",
        element: <CreatePost />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      {
        path: "/aboutuser",
        element: <AboutUser />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
