import request from 'supertest';
import server from '#config/server/api-config.js';

import factory from './utils/factories.js';

describe('Activity', () => {
  it('The user must be able to create activity in the application', async () => {
    const response = await factory.create('Activity');

    expect(response).toHaveProperty('_id');
  });

  it('The user must be able to get your owner activity', async () => {
    const user = await factory.create('User');

    const userReq = await request(server).post('/session/login').send({
      email: user.email,
      password_hash: user.password_hash,
    });

    const { token } = userReq.body;

    const activity = await factory.create('Activity');

    const activityReq = await request(server)
      .get(`/activity/${activity._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(activityReq.status).toBe(201);
  });
});
