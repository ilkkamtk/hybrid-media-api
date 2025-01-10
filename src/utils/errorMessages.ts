export const ERROR_MESSAGES = {
  MEDIA: {
    NOT_FOUND: 'No media found',
    NOT_FOUND_USER: 'No media found for user',
    NOT_FOUND_LIKED: 'No liked media found',
    NOT_CREATED: 'Failed to create media',
    NOT_UPDATED: 'Media not updated',
    NOT_DELETED: 'Media not deleted',
    NO_ID: 'No id provided',
  },
  LIKE: {
    NOT_FOUND: 'No likes found',
    NOT_FOUND_MEDIA: 'No likes found for media',
    NOT_FOUND_USER: 'No likes found for user',
    NOT_CREATED: 'Like not created',
    NOT_DELETED: 'Like not deleted',
    ALREADY_EXISTS: 'User has already liked this media item',
  },
  TAG: {
    NOT_FOUND: 'No tags found',
    NOT_FOUND_MEDIA: 'No tags found for media',
    NOT_CREATED: 'Tag not created',
    NOT_DELETED: 'Tag not deleted',
    NOT_AUTHORIZED: 'Not authorized to modify tags',
    FILES_NOT_FOUND: 'No files found with this tag',
  },
} as const;
