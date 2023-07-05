interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileUrl: string;
  subscribers: number;
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
