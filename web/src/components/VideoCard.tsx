import { Link } from "react-router-dom";
import { Video } from "../types";

export default function VideoCard({
  video_name,
  video_thumbnail_url,
  video_url,
  video_id,
  video_upload_date,
  user_id,
  username,
  video_likes,
  video_dislikes,
  video_views,
  video_thumbnail_public_id,
  video_public_id,
}: Video) {
  return (
    <Link
      to={video_url}
      className="d-flex w-25 flex-wrap flex-column gap-2 text-reset link-underline link-underline-opacity-0"
      style={{
        width: `300px`,
      }}
    >
      <img className="w-100 h-100" src={video_thumbnail_url} alt={video_name} />
      <div className="w-100 h-100 d-flex flex-column text-break">
        <p className="fw-bold m-0">{video_name}</p>
        <p className="m-0">{username}</p>
      </div>

      <div className="w-100 h-100 d-flex gap-1">
        <p className="m-0">
          {video_views} {video_views > 0 ? "Views" : "View"}
        </p>
        | <p>{video_upload_date}</p>
      </div>
    </Link>
  );
}
