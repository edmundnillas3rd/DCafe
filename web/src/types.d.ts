import { type ReactElement } from "react";

export type Props = {
  name?: string;
  icon?: ReactElement<any>;
  contentCreatorUrl?: string;
  profileUrl?: string;
  size?: string;
};
