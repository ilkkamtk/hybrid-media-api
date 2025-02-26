import {MessageResponse} from 'hybrid-types/MessageTypes';
import request from 'supertest';
import {Application} from 'express';

const postRating = (
  url: string | Application,
  mediaId: number,
  token: string,
  rating: number,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(`/api/v1/ratings/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({rating_value: rating})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Rating added');
          resolve(message);
        }
      });
  });
};

const getRatings = (
  url: string | Application,
  mediaId: number,
): Promise<{average: number; count: number}> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/ratings/${mediaId}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result).toHaveProperty('average');
          expect(result).toHaveProperty('count');
          expect(typeof result.average).toBe('number');
          expect(typeof result.count).toBe('number');
          resolve(result);
        }
      });
  });
};

const deleteRating = (
  url: string | Application,
  mediaId: number,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/ratings/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Rating deleted');
          resolve(message);
        }
      });
  });
};

const getNotFoundRating = (
  url: string | Application,
  mediaId: number,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/ratings/${mediaId}`)
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

const postInvalidRating = (
  url: string | Application,
  mediaId: number,
  token: string,
  invalidRating: number,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(`/api/v1/ratings/${mediaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({rating_value: invalidRating}) // Rating outside valid range (1-5)
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

const deleteInvalidRating = (
  url: string | Application,
  mediaId: string,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/ratings/${mediaId}`)
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

export {
  postRating,
  getRatings,
  deleteRating,
  getNotFoundRating,
  postInvalidRating,
  deleteInvalidRating,
};
