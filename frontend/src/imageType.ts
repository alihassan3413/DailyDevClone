type ImagePreviewRes = {
  url: string;
  title: string;
  siteName: string | undefined;
  description: string | undefined;
  mediaType: string;
  contentType: string | undefined;
  images: string[];
  videos: {};
  favicons: string[];
};

type ApiResponse<T> = {
  data: Array<T> | [];
  path: string;
  per_page: number;
  next_cursor: string;
  next_page_url: string;
  prev_cursor: string;
  prev_page_url: string;
};

type PostType = {
  title?: string;
  description?: string;
  url?: string;
  image_url?: string;
};

type PostStateType = {
  id: number;
  user_id: number;
  title: string;
  vote: number;
  comment_count: number;
  description: string;
  created_at: string;
  url: string;
  image_url: string;
  user: User;
};

type User = {
  id?: number;
  name?: string;
  profile_image?: string;
  username?: string;
  email?: string;
};
