/**
 * @api {get} /comments Get All Comments
 * @apiName GetCommentList
 * @apiGroup Comment
 *
 * @apiSuccess {Object[]} Array of comment objects
 * @apiSuccess {Number} comment_id Comment's unique ID
 * @apiSuccess {Number} user_id User's ID who made the comment
 * @apiSuccess {Number} media_id ID of the commented media
 * @apiSuccess {String} comment_text Content of the comment
 * @apiSuccess {String} created_at Timestamp when comment was created
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "comment_id": 1,
 *         "user_id": 1,
 *         "media_id": 1,
 *         "comment_text": "Great photo!",
 *         "created_at": "2024-01-26T09:38:08.000Z"
 *       }
 *     ]
 *
 * @apiError CommentsNotFound No comments found
 */
/**
 * @api {post} /comments Post Comment
 * @apiName PostComment
 * @apiGroup Comment
 *
 * @apiHeader {String} Authorization Bearer token for authentication
 *
 * @apiParam {String} comment_text Text of the comment
 * @apiParam {Number} media_id ID of the media
 *
 * @apiSuccess {String} message Success message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment added"
 *     }
 *
 * @apiError ValidationError Invalid input parameters
 */
/**
 * @api {get} /comments/bymedia/:id Get Comments by Media ID
 * @apiName GetCommentsByMediaId
 * @apiGroup Comment
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Object[]} Array of comments for the media
 * @apiSuccess {Number} comment_id ID of the comment
 * @apiSuccess {Number} user_id ID of the user who commented
 * @apiSuccess {Number} media_id ID of the media
 * @apiSuccess {String} comment_text Content of the comment
 * @apiSuccess {String} created_at Timestamp when created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "comment_id": 1,
 *         "user_id": 1,
 *         "media_id": 1,
 *         "comment_text": "This is a comment",
 *         "created_at": "2024-01-26T09:38:08.000Z"
 *       }
 *     ]
 *
 * @apiError CommentsNotFound No comments found
 */
/**
 * @api {get} /comments/byuser Get Comments by User Token
 * @apiName GetCommentsByUserToken
 * @apiGroup Comment
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiSuccess {Object[]} Array of comments for the user
 * @apiSuccess {Number} comment_id ID of the comment
 * @apiSuccess {Number} user_id ID of the user who commented
 * @apiSuccess {Number} media_id ID of the media
 * @apiSuccess {String} comment_text Content of the comment
 * @apiSuccess {String} created_at Timestamp when created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "comment_id": 1,
 *         "user_id": 1,
 *         "media_id": 1,
 *         "comment_text": "This is a comment",
 *         "created_at": "2024-01-26T09:38:08.000Z"
 *       }
 *     ]
 *
 * @apiError CommentsNotFound The comments were not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No comments found for this user"
 *     }
 */
/**
 * @api {get} /comments/count/:id Get Comment Count by Media ID
 * @apiName GetCommentCountByMediaId
 * @apiGroup Comment
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Number} count Count of comments for the media.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 5
 *     }
 *
 * @apiError CommentsNotFound The comments were not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No comments found for this media"
 *     }
 */
/**
 * @api {get} /comments/:id Get Comment by ID
 * @apiName GetCommentById
 * @apiGroup Comment
 *
 * @apiParam {Number} id Comment's unique ID.
 *
 * @apiSuccess {Number} comment_id ID of the comment
 * @apiSuccess {Number} user_id ID of the user
 * @apiSuccess {Number} media_id ID of the media
 * @apiSuccess {String} comment_text Content of the comment
 * @apiSuccess {String} created_at Timestamp when created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comment_id": 1,
 *       "user_id": 1,
 *       "media_id": 1,
 *       "comment_text": "This is a comment",
 *       "created_at": "2024-01-26T09:38:08.000Z"
 *     }
 *
 * @apiError CommentNotFound Comment not found
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 */
/**
 * @api {put} /comments/:id Update Comment
 * @apiName UpdateComment
 * @apiGroup Comment
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Comment's unique ID.
 * @apiParam {String} comment_text Text of the comment.
 *
 * @apiSuccess {String} message Success message
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment updated"
 *     }
 *
 * @apiError CommentNotFound The comment was not found.
 * @apiError Unauthorized Not authorized to update this comment.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 */
/**
 * @api {delete} /comments Delete Comment
 * @apiName DeleteComment
 * @apiGroup Comment
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Comment's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment deleted"
 *     }
 *
 * @apiError CommentNotFound The comment was not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 */
