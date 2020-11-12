import request from 'supertest';
import server from '#config/server/api-config.js';

import factory from './utils/factories.js';

describe('Activity', () => {
  it('The user must be able to create activity in the application', async () => {
    const response = await factory.create('Activity');

    expect(response).toHaveProperty('_id');
  });

  it('The user must be able to get your owner activity', async () => {
    const createdUser = await factory.create('User');
    const userId = createdUser._id;

    const loggedUser = await request(server).post('/session/login').send({
      email: createdUser.email,
      password_hash: createdUser.password_hash,
    });

    const { token } = loggedUser.body;

    const activityData = await factory.attrs('Activity');

    const createdActivity = await request(server)
      .post(`/activity`)
      .send({ ...activityData, id_owner_user: userId })
      .set('Authorization', `Bearer ${token}`);
    const activityId = createdActivity.body._id;

    const gettedActivity = await request(server)
      .get(`/activity/${activityId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(gettedActivity.status).toBe(201);
  });
});
