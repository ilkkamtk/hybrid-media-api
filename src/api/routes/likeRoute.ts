import express from 'express';
import {
  likeListGet,
  likeListByMediaIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByMediaIdGet,
} from '../controllers/likeController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(likeListGet).post(authenticate, likePost);

router.route('/bymedia/:id').get(likeListByMediaIdGet);

router.route('/byuser/:id').get(authenticate, likeListByUserIdGet);

router.route('/count/:id').get(likeCountByMediaIdGet);

router.route('/:id').delete(authenticate, likeDelete);

export default router;
