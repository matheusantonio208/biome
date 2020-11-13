import request from 'supertest';
import server from '#config/server/api-config.js';

import factory from '../utils/factories.js';

export const createActivity = async (userIdLogged, userToken) => {
  const activityData = await factory.attrs('Activity');

  const newActivity = await request(server)
    .post(`/activity`)
    .send({ ...activityData, id_owner_user: userIdLogged })
    .set('Authorization', `Bearer ${userToken}`);
  return newActivity;
};
