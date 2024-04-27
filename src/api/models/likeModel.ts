import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Like, UserLevel} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';
import {MessageResponse} from '@sharedTypes/MessageTypes';

// Request a list of likes
const fetchAllLikes = async (): Promise<Like[] | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT * FROM Likes'
  );
  if (rows.length === 0) {
    return null;
  }
  return rows;
};

// Request a list of likes by media item id
const fetchLikesByMediaId = async (id: number): Promise<Like[] | null> => {
  console.log('SELECT * FROM Likes WHERE media_id = ' + id);
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT * FROM Likes WHERE media_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return null;
  }
  return rows;
};

// Request a count of likes by media item id
const fetchLikesCountByMediaId = async (id: number): Promise<number | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT COUNT(*) as likesCount FROM Likes WHERE media_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0].likesCount;
};

// Request a list of likes by user id
const fetchLikesByUserId = async (id: number): Promise<Like[] | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT * FROM Likes WHERE user_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return null;
  }
  return rows;
};

// Post a new like
const postLike = async (
  media_id: number,
  user_id: number
): Promise<MessageResponse | null> => {
  try {
    // check if like already exists
    const [likeExists] = await promisePool.execute<RowDataPacket[] & Like[]>(
      'SELECT * FROM Likes WHERE media_id = ? AND user_id = ?',
      [media_id, user_id]
    );
    if (likeExists.length !== 0) {
      return null;
    }

    const [likeResult] = await promisePool.execute<ResultSetHeader>(
      'INSERT INTO Likes (user_id, media_id) VALUES (?, ?)',
      [user_id, media_id]
    );
    if (likeResult.affectedRows === 0) {
      return null;
    }

    return {message: 'Like added'};
  } catch (e) {
    console.error('postLike error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

// Delete a like
const deleteLike = async (
  like_id: number,
  user_id: number,
  user_level: UserLevel['level_name']
): Promise<MessageResponse | null> => {
  try {
    let sql = '';
    if (user_level === 'Admin') {
      sql = promisePool.format('DELETE FROM Likes WHERE like_id = ?', [
        like_id,
      ]);
    } else {
      sql = promisePool.format(
        'DELETE FROM Likes WHERE like_id = ? AND user_id = ?',
        [like_id, user_id]
      );
    }

    console.log(sql);

    const [likeResult] = await promisePool.execute<ResultSetHeader>(sql);
    if (likeResult.affectedRows === 0) {
      return null;
    }
    return {message: 'Like deleted'};
  } catch (e) {
    console.error('deleteLike error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const fetchLikeByMediaIdAndUserId = async (
  media_id: number,
  user_id: number
): Promise<Like> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT * FROM Likes WHERE media_id = ? AND user_id = ?',
    [media_id, user_id]
  );
  if (rows.length === 0) {
    throw new Error('Like not found');
  }
  return rows[0];
};

export {
  fetchAllLikes,
  fetchLikesByMediaId,
  fetchLikesByUserId,
  postLike,
  deleteLike,
  fetchLikesCountByMediaId,
  fetchLikeByMediaIdAndUserId,
};
