import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router/router.tsx";
import "../scss/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
