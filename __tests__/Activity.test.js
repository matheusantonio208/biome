import request from 'supertest';
import server from '#config/server/api-config.js';
import Mongoose from 'mongoose';

const User = require('./functions/user-functions.js');
const Activity = require('./functions/activity-functions.js');

describe('Activity', () => {
  beforeEach(async () => {
    await Mongoose.connection.dropDatabase();
  });

  it('The user must be able to create activity in the application', async () => {
    const createdUser = await User.createUser();
    const loggedUser = await User.loginUser(createdUser);
    const createdActivity = await Activity.createActivity(
      createdUser.body._id,
      loggedUser.body.token,
    );

    expect(createdActivity.status).toBe(201);
  });

  it('The user must be able to get your owner activity', async () => {
    const createdUser = await User.createUser();
    const loggedUser = await User.loginUser(createdUser);
    const createdActivity = await Activity.createActivity(
      createdUser.body._id,
      loggedUser.body.token,
    );

    const gettedActivity = await request(server)
      .get(`/activity/${createdActivity.body._id}`)
      .set('Authorization', `Bearer ${loggedUser.body.token}`);

    expect(gettedActivity.status).toBe(201);
  });
});
