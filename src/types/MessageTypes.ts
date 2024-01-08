import {MediaItem} from './DBTypes';

type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type MediaResponse = MessageResponse & {
  media: MediaItem | MediaItem[];
};

export type {MessageResponse, ErrorResponse, MediaResponse};
