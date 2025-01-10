/**
 * @api {get} /media?page=1&limit=10 Get Media List
 * @apiName GetMediaList
 * @apiGroup Media
 *
 * @apiParam {Number} [page=1] Page number (min: 1). Use both page and limit to implement pagination.
 * @apiParam {Number} [limit=10] Number of items per page (min: 1). Use both page and limit to implement pagination.
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} media Array of media items
 * @apiSuccess {Number} media.media_id Media's unique ID
 * @apiSuccess {Number} media.user_id User's unique ID
 * @apiSuccess {String} media.filename Media's filename
 * @apiSuccess {Number} media.filesize Media's filesize
 * @apiSuccess {String} media.media_type Media's type
 * @apiSuccess {String} media.title Media's title
 * @apiSuccess {String} media.description Media's description
 * @apiSuccess {String} media.created_at Media's creation date
 * @apiSuccess {String} media.thumbnail Media's thumbnail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media found",
 *       "media": [
 *         {
 *           "media_id": 73,
 *           "user_id": 7,
 *           "filename": "//localhost:3002/uploads/example.png",
 *           "filesize": 1256723,
 *           "media_type": "image/png",
 *           "title": "Example Title",
 *           "description": "Example Description",
 *           "created_at": "2024-01-26T09:38:08.000Z",
 *           "thumbnail": "//localhost:3002/uploads/example-thumb.png"
 *         }
 *       ]
 *     }
 *
 * @apiError MediaNotFound No media items found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */

/**
 * @api {post} /media Post Media
 * @apiName PostMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication
 *
 * @apiParam {String} title Title of the media (3-128 characters)
 * @apiParam {String} description Description of the media (max 1000 characters)
 * @apiParam {String} filename Filename of the media (alphanumeric, dots and hyphens only)
 * @apiParam {String} media_type Valid MIME type of the media
 * @apiParam {Number} filesize Size of the media file (min: 1)
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "Example Title",
 *       "description": "Example Description",
 *       "filename": "example.jpg",
 *       "media_type": "image/jpeg",
 *       "filesize": 12345
 *     }
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} media Created media object
 * @apiSuccess {Number} media.media_id ID of the media
 * @apiSuccess {Number} media.user_id ID of the user who posted the media
 * @apiSuccess {String} media.filename Filename of the media
 * @apiSuccess {Number} media.filesize Size of the media file
 * @apiSuccess {String} media.media_type Type of the media
 * @apiSuccess {String} media.title Title of the media
 * @apiSuccess {String} media.description Description of the media
 * @apiSuccess {String} media.created_at Timestamp when the media was created
 * @apiSuccess {String} media.thumbnail Thumbnail of the media
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media created",
 *       "media": {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpeg",
 *         "title": "Example Title",
 *         "description": "Example Description",
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       }
 *     }
 *
 * @apiError ValidationError Input validation failed
 * @apiError Unauthorized Authentication token missing or invalid
 * @apiError MediaNotCreated Media creation failed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errors": [
 *         {
 *           "msg": "Title must be between 3 and 128 characters",
 *           "param": "title",
 *           "location": "body"
 *         }
 *       ]
 *     }
 */

/**
 * @api {get} /media/:id Get Media by ID
 * @apiName GetMediaById
 * @apiGroup Media
 *
 * @apiParam {Number} id Media's unique ID (min: 1)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} media Media object
 * @apiSuccess {Number} media.media_id Media's unique ID
 * @apiSuccess {Number} media.user_id User's unique ID
 * @apiSuccess {String} media.filename Media's filename
 * @apiSuccess {Number} media.filesize Media's filesize
 * @apiSuccess {String} media.media_type Media's type
 * @apiSuccess {String} media.title Media's title
 * @apiSuccess {String} media.description Media's description
 * @apiSuccess {String} media.created_at Media's creation date
 * @apiSuccess {String} media.thumbnail Media's thumbnail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media found",
 *       "media": {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpeg",
 *         "title": "Example Title",
 *         "description": "Example Description",
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       }
 *     }
 *
 * @apiError MediaNotFound No media found with this ID
 * @apiError InvalidId Invalid media ID provided
 */

/**
 * @api {put} /media/:id Update Media
 * @apiName UpdateMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication
 *
 * @apiParam {Number} id Media's unique ID (min: 1)
 * @apiParam {String} [title] New title (3-128 characters)
 * @apiParam {String} [description] New description (max 1000 characters)
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "Updated Title",
 *       "description": "Updated Description"
 *     }
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} media Updated media object
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media updated",
 *       "media": {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpeg",
 *         "title": "Updated Title",
 *         "description": "Updated Description",
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       }
 *     }
 *
 * @apiError Unauthorized Not authorized to update this media
 * @apiError MediaNotFound Media not found
 * @apiError ValidationError Invalid input data
 */

/**
 * @api {delete} /media/:id Delete Media
 * @apiName DeleteMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication
 *
 * @apiParam {Number} id Media's unique ID (min: 1)
 *
 * @apiSuccess {String} message Success message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media deleted"
 *     }
 *
 * @apiError Unauthorized Not authorized to delete this media
 * @apiError MediaNotFound Media not found
 * @apiError InvalidId Invalid media ID provided
 */

/**
 * @api {get} /media/byuser/:id Get Media by User ID
 * @apiName GetMediaByUserId
 * @apiGroup Media
 *
 * @apiParam {Number} id User's unique ID (min: 1)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} media Array of media items by user
 * @apiSuccess {Number} media.media_id Media's unique ID
 * @apiSuccess {Number} media.user_id User's unique ID
 * @apiSuccess {String} media.filename Media's filename
 * @apiSuccess {Number} media.filesize Media's filesize
 * @apiSuccess {String} media.media_type Media's type
 * @apiSuccess {String} media.title Media's title
 * @apiSuccess {String} media.description Media's description
 * @apiSuccess {String} media.created_at Media's creation date
 * @apiSuccess {String} media.thumbnail Media's thumbnail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media found",
 *       "media": [
 *         {
 *           "media_id": 1,
 *           "user_id": 1,
 *           "filename": "example.jpg",
 *           "filesize": 12345,
 *           "media_type": "image/jpeg",
 *           "title": "Example Title",
 *           "description": "Example Description",
 *           "created_at": "2024-01-26T09:38:08.000Z",
 *           "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *         }
 *       ]
 *     }
 *
 * @apiError MediaNotFound No media found for this user
 * @apiError InvalidId Invalid user ID provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */

/**
 * @api {get} /media/bytoken Get Media by User Token
 * @apiName GetMediaByToken
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} media Array of media items for authenticated user
 * @apiSuccess {Number} media.media_id Media's unique ID
 * @apiSuccess {Number} media.user_id User's unique ID
 * @apiSuccess {String} media.filename Media's filename
 * @apiSuccess {Number} media.filesize Media's filesize
 * @apiSuccess {String} media.media_type Media's type
 * @apiSuccess {String} media.title Media's title
 * @apiSuccess {String} media.description Media's description
 * @apiSuccess {String} media.created_at Media's creation date
 * @apiSuccess {String} media.thumbnail Media's thumbnail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media found",
 *       "media": [
 *         {
 *           "media_id": 1,
 *           "user_id": 1,
 *           "filename": "example.jpg",
 *           "filesize": 12345,
 *           "media_type": "image/jpeg",
 *           "title": "Example Title",
 *           "description": "Example Description",
 *           "created_at": "2024-01-26T09:38:08.000Z",
 *           "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *         }
 *       ]
 *     }
 *
 * @apiError MediaNotFound No media found for this user
 * @apiError InvalidToken Invalid or missing token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Invalid or missing token"
 *     }
 */

/**
 * @api {get} /media/mostliked Get Most Liked Media
 * @apiName GetMostLikedMedia
 * @apiGroup Media
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} media Most liked media item
 * @apiSuccess {Number} media.media_id Media's unique ID
 * @apiSuccess {Number} media.user_id User's unique ID
 * @apiSuccess {String} media.filename Media's filename
 * @apiSuccess {Number} media.filesize Media's filesize
 * @apiSuccess {String} media.media_type Media's type
 * @apiSuccess {String} media.title Media's title
 * @apiSuccess {String} media.description Media's description
 * @apiSuccess {String} media.created_at Media's creation date
 * @apiSuccess {String} media.thumbnail Media's thumbnail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Most liked media found",
 *       "media": {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpeg",
 *         "title": "Example Title",
 *         "description": "Example Description",
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       }
 *     }
 *
 * @apiError MediaNotFound No media found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */
