import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Action from "./components/Action/Action";
import Click from "./components/Click/Click";
import Path from "./components/Path/Path";
import MainGPS from "./components/Main/MainGPS";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <MainGPS />,
        },
        {
          path: "/Action",
          element: <Action />,
        },
        {
          path: "/Click",
          element: <Click />,
        },
        {
          path: "/Path",
          element: <Path />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
