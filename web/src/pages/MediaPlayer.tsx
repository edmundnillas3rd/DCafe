import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../types";

export default function MediaPlayer() {
  const { videoID } = useParams();

  const [video, setVideo] = useState<Video>();

  const getVideo = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL as string}/v1/video/${
        videoID as string
      }/video-watch`
    );

    const data = (await response.json()) as Video;
    setVideo(data);
  };

  useEffect(() => {
    getVideo().catch((error) => console.error(error));
  }, []);

  return (
    <div className="container-fluid">
      <iframe src={video?.video_url} width="600" height="200"></iframe>
    </div>
  );
}
