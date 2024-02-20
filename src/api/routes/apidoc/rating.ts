/**
 * @api {get} /ratings Request Rating List
 * @apiName GetRatingList
 * @apiGroup Rating
 *
 * @apiSuccess {Number} rating_id ID of the Rating.
 * @apiSuccess {Number} rating_value Value of the Rating.
 * @apiSuccess {Number} media_id ID of the Media.
 * @apiSuccess {Date} created_at Timestamp of when the Rating was created.
 * @apiSuccess {Number} user_id ID of the User who gave the Rating.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "rating_id": 1,
 *         "rating_value": 5,
 *         "media_id": 1,
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "user_id": 1
 *       }
 *     ]
 *
 * @apiError NoRatingsFound No ratings found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No ratings found"
 *     }
 */
/**
 * @api {get} /ratings/bymedia/:id Request Rating List by Media ID
 * @apiName GetRatingListByMediaId
 * @apiGroup Rating
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Object[]} ratings List of Ratings.
 * @apiSuccess {Number} ratings.rating_id ID of the Rating.
 * @apiSuccess {Number} ratings.rating_value Value of the Rating.
 * @apiSuccess {Number} ratings.media_id ID of the Media.
 * @apiSuccess {Date} ratings.created_at Timestamp of when the Rating was created.
 * @apiSuccess {Number} ratings.user_id ID of the User who gave the Rating.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "rating_id": 1,
 *         "rating_value": 5,
 *         "media_id": 1,
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "user_id": 1
 *       }
 *     ]
 *
 * @apiError NoRatingsFound No ratings found for the specified media ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No ratings found"
 *     }
 */
/**
 * @api {get} /ratings/byuser Request Rating List by User Token
 * @apiName GetRatingListByUserToken
 * @apiGroup Rating
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiSuccess {Object[]} ratings List of Ratings.
 * @apiSuccess {Number} ratings.rating_id ID of the Rating.
 * @apiSuccess {Number} ratings.rating_value Value of the Rating.
 * @apiSuccess {Number} ratings.media_id ID of the Media.
 * @apiSuccess {Date} ratings.created_at Timestamp of when the Rating was created.
 * @apiSuccess {Number} ratings.user_id ID of the User who gave the Rating.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "rating_id": 1,
 *         "rating_value": 5,
 *         "media_id": 1,
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "user_id": 1
 *       }
 *     ]
 *
 * @apiError NoRatingsFound No ratings found for the specified user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No ratings found"
 *     }
 */
/**
 * @api {get} /ratings/average/:id Request Average Rating by Media ID
 * @apiName GetAverageRatingByMediaId
 * @apiGroup Rating
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Number} average Average rating of the Media.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "average": 4.5
 *     }
 *
 * @apiError NoRatingsFound No ratings found for the specified media ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No ratings found"
 *     }
 */
/**
 * @api {delete} /ratings/:id Delete Rating
 * @apiName DeleteRating
 * @apiGroup Rating
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Rating's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Rating deleted successfully"
 *     }
 *
 * @apiError RatingNotFound The id of the Rating was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "RatingNotFound"
 *     }
 */
/**
 * @api {post} /ratings Post Rating
 * @apiName PostRating
 * @apiGroup Rating
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} rating_value Rating value, can be an float between 0 and 5. 0 deletes the rating.
 * @apiParam {Number} media_id Media's unique ID.
 *
 * @apiExample {json} Request-Example:
 *     {
 *       "rating_value": 5,
 *       "media_id": 1
 *     }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Rating added"
 *     }
 *
 * @apiError ValidationError Validation failed for the input parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ValidationError"
 *     }
 */
