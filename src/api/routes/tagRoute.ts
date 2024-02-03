import express from 'express';
import {
  tagListGet,
  tagListByMediaIdGet,
  tagPost,
  tagDelete,
  tagFilesByTagGet,
  tagDeleteFromMedia,
} from '../controllers/tagController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(tagListGet).post(authenticate, tagPost);

router
  .route('/bymedia/:id')
  .get(tagListByMediaIdGet)
  .delete(authenticate, tagDeleteFromMedia);

router.route('/bytag/:tag').get(tagFilesByTagGet);

router.route('/:id').delete(authenticate, tagDelete);

export default router;
