import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {MediaItem} from '../../types/DBTypes';
import promisePool from '../../lib/db';
import {fetchData} from '../../lib/functions';

/**
 * Get all media items from the database
 *
 * @returns {array} - array of media items
 * @throws {Error} - error if database query fails
 */

const fetchAllMedia = async (): Promise<MediaItem[] | null> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[] & MediaItem[]>(
      'SELECT * FROM MediaItems'
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllMedia error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get media item by id from the database
 *
 * @param {number} id - id of the media item
 * @returns {object} - object containing all information about the media item
 * @throws {Error} - error if database query fails
 */

const fetchMediaById = async (id: number): Promise<MediaItem | null> => {
  try {
    // TODO: replace * with specific column names needed in this case
    const sql = `SELECT media_id, filename, filesize, media_type, title, description, MediaItems.created_at, Users.user_id, username
                 FROM MediaItems JOIN Users ON MediaItems.user_id = Users.user_id
                 WHERE media_id=?`;
    const params = [id];
    const [rows] = await promisePool.execute<RowDataPacket[] & MediaItem[]>(
      sql,
      params
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('fetchMediaById error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 * @throws {Error} - error if database query fails
 */
const postMedia = async (
  media: Omit<MediaItem, 'media_id' | 'created_at'>
): Promise<MediaItem | null> => {
  const {user_id, filename, filesize, media_type, title, description} = media;
  const sql = `INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, filesize, media_type, title, description];
  try {
    const result = await promisePool.execute<ResultSetHeader>(sql, params);
    console.log('result', result);
    const [rows] = await promisePool.execute<RowDataPacket[] & MediaItem[]>(
      'SELECT * FROM MediaItems WHERE media_id = ?',
      [result[0].insertId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Update media item in database
 *
 * @param {object} media - object containing all information about the media item
 * @param {number} id - id of the media item
 * @returns {object} - object containing id of the updated media item in db
 * @throws {Error} - error if database query fails
 */

const putMedia = async (
  media: Pick<MediaItem, 'title' | 'description'>,
  id: number
) => {
  try {
    const sql = promisePool.format('UPDATE MediaItems SET ? WHERE ?', [
      media,
      id,
    ]);
    const result = await promisePool.execute<ResultSetHeader>(sql);
    console.log('result', result);
    return {media_id: result[0].insertId};
  } catch (e) {
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Delete media item from database
 *
 * @param {number} id - id of the media item
 * @returns {object} - object containing id of the deleted media item in db
 * @throws {Error} - error if database query fails
 */

const deleteMedia = async (id: number): Promise<number | null> => {
  console.log('deleteMedia', id);
  const media = await fetchMediaById(id);

  if (!media) {
    return null;
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({filename: media.filename}),
  };

  const deleteResult = await fetchData(
    process.env.UPLOAD_SERVER + '/delete',
    options
  );

  console.log('deleteResult', deleteResult);

  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM Likes WHERE media_id = ?;', [id]);

    await connection.execute('DELETE FROM Comments WHERE media_id = ?;', [id]);

    await connection.execute('DELETE FROM Ratings WHERE media_id = ?;', [id]);

    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM MediaItems WHERE media_id = ?;',
      [id]
    );

    await connection.commit();

    console.log('result', result);
    return id;
  } catch (e) {
    await connection.rollback();
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  } finally {
    connection.release();
  }
};

/**
 * Get all the most liked media items from the database
 *
 * @returns {object} - object containing all information about the most liked media item
 * @throws {Error} - error if database query fails
 */

const fetchMostLikedMedia = async (): Promise<MediaItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & MediaItem[]>(
      'SELECT * FROM `MostLikedMedia`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
  } catch (e) {
    console.error('getMostLikedMedia error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get all the most commented media items from the database
 *
 * @returns {object} - object containing all information about the most commented media item
 * @throws {Error} - error if database query fails
 */

const fetchMostCommentedMedia = async (): Promise<MediaItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & MediaItem[]>(
      'SELECT * FROM `MostCommentedMedia`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
  } catch (e) {
    console.error('getMostCommentedMedia error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get all the highest rated media items from the database
 *
 * @returns {object} - object containing all information about the highest rated media item
 * @throws {Error} - error if database query fails
 */

const fetchHighestRatedMedia = async (): Promise<MediaItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & MediaItem[]>(
      'SELECT * FROM `HighestRatedMedia`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
    return rows[0];
  } catch (e) {
    console.error('getHighestRatedMedia error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {
  fetchAllMedia,
  fetchMediaById,
  postMedia,
  deleteMedia,
  fetchMostLikedMedia,
  fetchMostCommentedMedia,
  fetchHighestRatedMedia,
  putMedia,
};
