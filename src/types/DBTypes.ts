type UserLevel = {
  level_id: number;
  level_name: 'Admin' | 'User' | 'Guest';
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date;
};

type MediaItem = {
  media_id: number;
  user_id: number;
  filename: string;
  thumbnail: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string | null;
  created_at: Date;
};

type Comment = {
  comment_id: number;
  media_id: number;
  user_id: number;
  comment_text: string;
  created_at: Date;
};

type Like = {
  like_id: number;
  media_id: number;
  user_id: number;
  created_at: Date;
};

type Rating = {
  rating_id: number;
  media_id: number;
  user_id: number;
  rating_value: number;
  created_at: Date;
};

type Tag = {
  tag_id: number;
  tag_name: string;
};

type MediaItemTag = {
  media_id: number;
  tag_id: number;
};

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

type MostLikedMedia = Pick<
  MediaItem,
  | 'media_id'
  | 'filename'
  | 'filesize'
  | 'media_type'
  | 'title'
  | 'description'
  | 'created_at'
> &
  Pick<User, 'user_id' | 'username' | 'email' | 'created_at'> & {
    likes_count: bigint;
  };

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

export type {
  UserLevel,
  User,
  MediaItem,
  Comment,
  Like,
  Rating,
  Tag,
  MediaItemTag,
  UploadResult,
  MostLikedMedia,
  TokenContent,
};
