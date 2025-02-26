import dotenv from 'dotenv';
dotenv.config();
import {MediaItem, User, UserWithNoPassword} from 'hybrid-types/DBTypes';
import {
  uploadMediaFile,
  getMediaItems,
  getMediaItem,
  postMediaItem,
  putMediaItem,
  deleteMediaItem,
  getNotFoundMediaItem,
  putNotFoundMediaItem,
  deleteNotFoundMediaItem,
  postInvalidMediaItem,
  putInvalidMediaItem,
  deleteInvalidMediaItem,
  getInvalidMediaItem,
  getMediaItemsWithPagination,
  getMostLikedMedia,
  getMediaByUser,
  getMediaByToken,
  getMediaByTag,
} from './testMediaItem';
import randomstring from 'randomstring';
import {UploadResponse} from 'hybrid-types/MessageTypes';
import {loginUser, registerUser} from './testUser';
import app from '../src/app';
// const app = 'http://localhost:3000';
import {
  postTag,
  getTags,
  deleteTag,
  getNotFoundTag,
  postInvalidTag,
} from './testTag';
import {
  postLike,
  getLikes,
  deleteLike,
  getNotFoundLike,
  postInvalidLike,
} from './testLike';
import {
  postComment,
  getComments,
  deleteComment,
  getNotFoundComment,
  postInvalidComment,
  deleteInvalidComment,
} from './testComment';
import {
  postRating,
  getRatings,
  deleteRating,
  getNotFoundRating,
  postInvalidRating,
  deleteInvalidRating,
} from './testRating';

if (!process.env.AUTH_SERVER || !process.env.UPLOAD_SERVER) {
  throw new Error('Missing environment variables for API tests');
}
const authApi = process.env.AUTH_SERVER;
const uploadApi = process.env.UPLOAD_SERVER;

describe('Media API Success Cases', () => {
  // test create user
  let token: string;
  let user: UserWithNoPassword;
  const testUser: Partial<User> = {
    username: 'Test_User_' + randomstring.generate(7),
    email: randomstring.generate(9).toLowerCase() + '@user.fi',
    password: 'asdfQEWR1234',
  };
  it('should create a new user', async () => {
    await registerUser(authApi, '/users', testUser);
  });

  // test login
  it('should return a user object and bearer token on valid credentials', async () => {
    const path = authApi + '/auth/login';
    console.log(path);
    const response = await loginUser(authApi, '/auth/login', {
      username: testUser.username!,
      password: testUser.password!,
    });
    token = response.token;
    user = response.user;
  });

  // test upload media file
  let uploadResponse: UploadResponse;
  it('should upload a media file', async () => {
    const mediaFile = './test/testfiles/testPic.jpeg';
    uploadResponse = await uploadMediaFile(
      uploadApi,
      '/upload',
      mediaFile,
      token,
    );
  });

  // post media item
  it('should post a media item', async () => {
    if (uploadResponse.data) {
      const mediaItem: Partial<MediaItem> = {
        title: 'Test Pic',
        description: 'A test picture',
        filename: uploadResponse.data.filename,
        media_type: uploadResponse.data.media_type,
        filesize: uploadResponse.data.filesize,
      };
      await postMediaItem(app, '/api/v1/media', token, mediaItem);
    }
  });

  // test succesful media routes
  let mediaItems: MediaItem[];
  let testMediaItem: MediaItem;
  it('Should get array of media items', async () => {
    mediaItems = await getMediaItems(app);
    testMediaItem = mediaItems[0];
  });

  it('Should get media item by id', async () => {
    const mediaItem = await getMediaItem(app, testMediaItem.media_id);
    expect(mediaItem.media_id).toBe(testMediaItem.media_id);
  });

  it('Should get media items with pagination', async () => {
    const mediaItems = await getMediaItemsWithPagination(app, 1, 5);
    expect(mediaItems.length).toBeLessThanOrEqual(5);
  });

  it('Should get most liked media', async () => {
    const mediaItem = await getMostLikedMedia(app);
    expect(mediaItem.media_id).toBeGreaterThan(0);
  });

  it('Should get media by user', async () => {
    const mediaItems = await getMediaByUser(app, user.user_id);
    mediaItems.forEach((item) => {
      expect(item.user_id).toBe(user.user_id);
    });
  });

  it('Should get media by token', async () => {
    const mediaItems = await getMediaByToken(app, token);
    expect(Array.isArray(mediaItems)).toBe(true);
  });

  // test update operations
  it('Should update media item', async () => {
    const updatedItem = {
      title: 'Updated Test Title',
      description: 'Updated test description',
      filename: testMediaItem.filename,
      media_type: testMediaItem.media_type,
      filesize: testMediaItem.filesize,
      user_id: testMediaItem.user_id,
    };
    await putMediaItem(app, testMediaItem.media_id, token, updatedItem);
  });

  // test tag operations
  it('Should add a tag to media item', async () => {
    await postTag(app, testMediaItem.media_id, token, 'test-tag');
  });

  it('Should get media items by tag', async () => {
    const mediaItems = await getMediaByTag(app, 'test-tag');
    expect(Array.isArray(mediaItems)).toBe(true);
  });

  it('Should get tags by media id', async () => {
    const tags = await getTags(app, testMediaItem.media_id);
    expect(Array.isArray(tags)).toBe(true);
  });

  // test like operations
  it('Should add a like to media item', async () => {
    await postLike(app, testMediaItem.media_id, token);
  });

  it('Should get likes count by media id', async () => {
    await getLikes(app, testMediaItem.media_id);
  });

  // test comment operations
  it('Should add a comment to media item', async () => {
    await postComment(app, testMediaItem.media_id, token, 'Test comment');
  });

  it('Should get comments by media id', async () => {
    const comments = await getComments(app, testMediaItem.media_id);
    expect(Array.isArray(comments)).toBe(true);
  });

  // test rating operations
  it('Should add a rating to media item', async () => {
    await postRating(app, testMediaItem.media_id, token, 4);
  });

  it('Should get ratings for media item', async () => {
    const ratings = await getRatings(app, testMediaItem.media_id);
    expect(ratings.average).toBeGreaterThanOrEqual(1);
    expect(ratings.average).toBeLessThanOrEqual(5);
    expect(ratings.count).toBeGreaterThan(0);
  });

  // test delete operations (moved to end)
  it('Should delete a rating', async () => {
    await deleteRating(app, testMediaItem.media_id, token);
  });

  it('Should delete a comment', async () => {
    const comments = await getComments(app, testMediaItem.media_id);
    await deleteComment(app, comments[0].comment_id, token);
  });

  it('Should delete a like', async () => {
    await deleteLike(app, testMediaItem.media_id, token);
  });

  it('Should delete a tag', async () => {
    await deleteTag(app, testMediaItem.media_id, 'test-tag', token);
  });

  it('Should delete media item', async () => {
    await deleteMediaItem(app, testMediaItem.media_id, token);
  });
});

describe('Media API Error Cases', () => {
  let token: string;
  let testMediaItem: MediaItem;

  beforeAll(async () => {
    // Setup code needed for error tests
    const testUser: Partial<User> = {
      username: 'Test_User_' + randomstring.generate(7),
      email: randomstring.generate(9) + '@user.fi',
      password: 'asdfQEWR1234',
    };
    await registerUser(authApi, '/users', testUser);
    const response = await loginUser(authApi, '/auth/login', {
      username: testUser.username!,
      password: testUser.password!,
    });
    token = response.token;

    // Get a test media item for reference
    const mediaItems = await getMediaItems(app);
    testMediaItem = mediaItems[0];
  });

  // 404 error tests
  it('Should return 404 when getting non-existent media item', async () => {
    await getNotFoundMediaItem(app, 999999);
  });

  it('Should return 404 when updating non-existent media item', async () => {
    await putNotFoundMediaItem(app, 999999, 'Test media');
  });

  it('Should return 404 when deleting non-existent media item', async () => {
    await deleteNotFoundMediaItem(app, 999999);
  });

  it('Should return 404 for non-existent tag', async () => {
    await getNotFoundTag(app, 999999);
  });

  it('Should return 404 for non-existent like', async () => {
    await getNotFoundLike(app, 999999);
  });

  it('Should return 404 for non-existent comment', async () => {
    await getNotFoundComment(app, 999999);
  });

  it('Should return 404 for non-existent rating', async () => {
    await getNotFoundRating(app, 999999);
  });

  // 400 error tests
  it('Should return 400 when posting invalid media item', async () => {
    await postInvalidMediaItem(app, '');
  });

  it('Should return 400 when updating with invalid media item data', async () => {
    await putInvalidMediaItem(app, 'invalid-id', '');
  });

  it('Should return 400 when deleting with invalid media id', async () => {
    await deleteInvalidMediaItem(app, 'invalid-id');
  });

  it('Should return 400 when getting media with invalid id', async () => {
    await getInvalidMediaItem(app, 'invalid-id');
  });

  it('Should return 400 for invalid tag data', async () => {
    await postInvalidTag(app, testMediaItem.media_id, token);
  });

  it('Should return 400 for invalid like operation', async () => {
    await postInvalidLike(app, 'invalid-id', token);
  });

  it('Should return 400 for invalid comment data', async () => {
    await postInvalidComment(app, testMediaItem.media_id, token);
  });

  it('Should return 400 for invalid comment deletion', async () => {
    await deleteInvalidComment(app, 'invalid-id', token);
  });

  it('Should return 400 for invalid rating value', async () => {
    await postInvalidRating(app, testMediaItem.media_id, token, 6); // Rating > 5
  });

  it('Should return 400 for invalid rating deletion', async () => {
    await deleteInvalidRating(app, 'invalid-id', token);
  });
});
