import {Request, Response, NextFunction} from 'express';
import {
  deleteMedia,
  fetchAllMedia,
  fetchMediaById,
  postMedia,
} from '../models/mediaModel';
import {MediaItem, TokenContent} from '../../types/DBTypes';
import CustomError from '../../classes/CustomError';
import {MediaResponse, MessageResponse} from '../../types/MessageTypes';

const mediaListGet = async (
  req: Request,
  res: Response<MediaItem[]>,
  next: NextFunction
) => {
  try {
    const media = await fetchAllMedia();
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaGet = async (
  req: Request<{id: string}>,
  res: Response<MediaItem>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const media = await fetchMediaById(id);
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaPost = async (
  req: Request<{}, {}, Omit<MediaItem, 'media_id' | 'created_at'>>,
  res: Response<MediaResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    // add user_id to media object from token
    req.body.user_id = res.locals.user.user_id;
    console.log(req.body);
    const newMedia = await postMedia(req.body);
    if (newMedia === null) {
      const error = new CustomError('Media not created', 500);
      next(error);
      return;
    }
    res.json({message: 'Media created', media: newMedia});
  } catch (error) {
    next(error);
  }
};

const mediaDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const deleted_id = await deleteMedia(id);
    if (deleted_id === null) {
      const error = new CustomError('Media not deleted', 500);
      next(error);
      return;
    }

    res.json({message: 'Media deleted'});
  } catch (error) {
    next(error);
  }
};

export {mediaListGet, mediaGet, mediaPost, mediaDelete};
