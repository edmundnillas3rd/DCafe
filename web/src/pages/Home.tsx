import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { type Video } from "../types";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  const getVideos = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL as string}/v1/video`
    );
    const data = (await response.json()) as Video[];
    setVideos(data);
  };

  useEffect(() => {
    getVideos().catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {videos.length !== 0 &&
        videos.map((v: Video) => (
          <Link
            key={v.video_id}
            className="link-info"
            to={`video-watch/${v.video_id}`}
          >
            {v.video_name}
          </Link>
        ))}
    </div>
  );
}
