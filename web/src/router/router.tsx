import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import MediaPlayer from "../pages/MediaPlayer";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "video-watch/:videoID",
        element: <MediaPlayer />,
      },
    ],
  },
]);

export default router;
