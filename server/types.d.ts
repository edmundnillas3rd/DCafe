interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscribers: number;
  profileUrl: string;
}

interface Video {
  id?: string;
  name: string;
  thumbnailUrl: string;
  url: string;
  uploadDate: string;
  userID: string;
}

interface Library {
  id?: string;
  name: string;
  displayState: string;
}

interface Comment {
  id?: string;
  description: string;
  date: string;
  videoID: string;
  userID: string;
}
