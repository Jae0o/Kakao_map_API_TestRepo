import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Main from "./components/Main/Main";
import Action from "./components/Action/Action";
import Click from "./components/Click/Click";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/Action",
          element: <Action />,
        },
        {
          path: "/Click",
          element: <Click />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
