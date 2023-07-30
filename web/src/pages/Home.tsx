import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { type Video } from "../types";
import VideoCard from "../components/VideoCard";

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
    <div className="container">
        {videos.length !== 0 &&
          videos.map((v: Video) => (
            <VideoCard
              key={v.video_id}
              video_name={v.video_name}
              video_thumbnail_url={v.video_thumbnail_url}
              video_id={v.video_id}
              video_url={v.video_url}
              video_upload_date={v.video_upload_date}
              user_id={v.user_id}
              username={v.username}
              video_likes={v.video_likes}
              video_dislikes={v.video_dislikes}
              video_views={v.video_views}
              video_thumbnail_public_id={v.video_thumbnail_public_id}
              video_public_id={v.video_public_id}
            />
          ))}
    </div>
  );
}
