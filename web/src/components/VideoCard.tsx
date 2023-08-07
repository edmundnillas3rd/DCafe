import { Link } from "react-router-dom";
import { Video } from "../types";
import moment from "moment";

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
      className="video-card card link-underline link-underline-opacity-0 px-0"
    >
      <img
        className="card-img-top"
        src={video_thumbnail_url}
        alt={video_name}
      />
      <div className="p-2">
        <div className="card=body">
          <h5 className="card-title">{video_name}</h5>
          <p className="card-text">{username}</p>
        </div>
        <div className="card-body flex-wrap p-0 d-flex w-100 h-100 d-flex gap-1">
          <p className="card-text">
            {video_views} {video_views > 0 ? "Views" : "View"}
          </p>
          <p className="card-text">
            {moment(video_upload_date, "YYYY-MM-DD").fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
}
