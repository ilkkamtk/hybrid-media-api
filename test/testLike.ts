import {MessageResponse} from 'hybrid-types/MessageTypes';
import request from 'supertest';
import {Application} from 'express';

const postLike = (
  url: string | Application,
  mediaId: number,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(`/api/v1/likes/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Like added');
          resolve(message);
        }
      });
  });
};

const getLikes = (
  url: string | Application,
  mediaId: number,
): Promise<{count: number}> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/likes/${mediaId}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result).toHaveProperty('count');
          expect(typeof result.count).toBe('number');
          resolve(result);
        }
      });
  });
};

const deleteLike = (
  url: string | Application,
  mediaId: number,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/likes/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Like deleted');
          resolve(message);
        }
      });
  });
};

const getNotFoundLike = (
  url: string | Application,
  mediaId: number,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/likes/${mediaId}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const postInvalidLike = (
  url: string | Application,
  mediaId: string,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(`/api/v1/likes/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

export {postLike, getLikes, deleteLike, getNotFoundLike, postInvalidLike};
