import express from 'express';
import {
  tagListGet,
  tagListByMediaIdGet,
  tagPost,
  tagDelete,
  tagFilesByTagGet,
  tagDeleteFromMedia,
  tagFilesByTagNameGet,
} from '../controllers/tagController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(tagListGet)
  .post(
    authenticate,
    body('tag_name')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 2, max: 50})
      .escape(),
    body('media_id').isInt({min: 1}).toInt(),
    validationErrors,
    tagPost,
  );

router
  .route('/bymedia/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    tagListByMediaIdGet,
  );

router
  .route('/bymedia/:media_id/:tag_name')
  .delete(
    authenticate,
    param('media_id').isInt({min: 1}).toInt(),
    param('tag_name')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 2, max: 50})
      .escape(),
    validationErrors,
    tagDeleteFromMedia,
  );

router
  .route('/bytagname/:tag_name')
  .get(
    param('tag_name')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 2, max: 50})
      .escape(),
    validationErrors,
    tagFilesByTagNameGet,
  );

router
  .route('/bytag/:tag_id')
  .get(
    param('tag_id').isInt({min: 1}).toInt(),
    validationErrors,
    tagFilesByTagGet,
  );

router
  .route('/:id')
  .delete(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    tagDelete,
  );

export default router;
