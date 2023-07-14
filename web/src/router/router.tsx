import { createBrowserRouter } from "react-router-dom";

import Home from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

export default router;
