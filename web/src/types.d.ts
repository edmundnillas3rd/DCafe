import { type ReactElement } from "react";

export type Props = {
  name?: string;
  icon?: ReactElement<any>;
  contentCreatorUrl?: string;
  profileUrl?: string;
  size?: string;
};

export type Video = {
  video_id: string;
  video_name: string;
  video_thumbnail_url: string;
  video_url: string;
  video_upload_date: string;
  user_id: string;
  video_likes: number;
  video_dislikes: number;
  video_views: number;
  video_thumbnail_public_id: string;
  video_public_id: string;
};
