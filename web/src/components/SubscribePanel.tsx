import { CgProfile } from "react-icons/cg";
import { Props } from "../types";

export default function SubscribePanel({
  name,
  contentCreatorUrl,
  profileUrl,
}: Props) {
  return (
    <a
      href={contentCreatorUrl ? contentCreatorUrl : "#"}
      className="link-light link-underline link-underline-opacity-0"
    >
      <div className="d-flex gap-2 align-items-center">
        {profileUrl ? (
          <img src={profileUrl} alt="profile"></img>
        ) : (
          <CgProfile size={24} />
        )}
        {name}
      </div>
    </a>
  );
}
