import request from 'supertest';
import Mongoose from 'mongoose';
import server from '#config/server/api-config.js';
import factory from './utils/factories.js';

const User = require('./functions/user-functions.js');

describe('Session', () => {
  it('The user must be able to log into the application', async () => {
    const createdUser = await User.createUser();
    const loggedUser = await User.loginUser(createdUser);

    expect(loggedUser.status).toBe(201);
  });
});

describe('User', () => {
  beforeEach(async () => {
    await Mongoose.connection.dropDatabase();
  });

  it('The user must register', async () => {
    const createdUser = await User.createUser();

    expect(createdUser.status).toBe(201);
  });

  it('The user should not be able to register repeated email', async () => {

    const createdUserA = await User.createUser();

    const createdUserB = await request(server)
      .post('/user/registration')
      .send(createdUserA.body);

    expect(createdUserB.status).toBe(400);
  });

  it('The user must be able to access their own information', async () => {
    const createdUser = await User.createUser();
    const loggedUser = await User.loginUser(createdUser);

    const getInformation = await request(server)
      .get(`/user/${createdUser.body._id}`)
      .set('Authorization', `Bearer ${loggedUser.body.token}`);

    expect(getInformation.status).toBe(200);
  });

  it("The user must not be able to access another user's information", async () => {
    const createdUserA = await User.createUser();
    const createdUserB = await User.createUser();

    const loggedUserA = await User.loginUser(createdUserA);

    const getInformationUserB = await request(server)
      .get(`/user/${createdUserB.body._id}`)
      .set('Authorization', `Bearer ${loggedUserA.body.token}`);

    expect(getInformationUserB.status).toBe(401);
  });

  it('The user must be able to delete his account', async () => {
    const createdUser = await User.createUser();
    const loggedUser = await User.loginUser(createdUser);

    const deletedUser = await request(server)
      .delete(`/user/${createdUser.body._id}`)
      .set('Authorization', `Bearer ${loggedUser.body.token}`);

    expect(deletedUser.status).toBe(200);
  });

  it("The user should not be able to delete another user's account", async () => {
    const createdUserA = await User.createUser();
    const createdUserB = await User.createUser();

    const loggedUserA = await User.loginUser(createdUserA);

    const deletedUserB = await request(server)
      .delete(`/user/${createdUserB.body._id}`)
      .set('Authorization', `Bearer ${loggedUserA.body.token}`);

    expect(deletedUserB.status).toBe(401);
  });

  it('The user must be able to update his registration information', async () => {
    const createdUser = await User.createUser();

    const loggedUser = await User.loginUser(createdUser);

    const newUserData = await factory.attrs('User');

    const updatedUser = await request(server)
      .put(`/user/${createdUser.body._id}`)
      .send(newUserData)
      .set('Authorization', `Bearer ${loggedUser.body.token}`);

    expect(updatedUser.status).toBe(200);
  });

  it("The user must not be able to update another user's registration information", async () => {
    const createdUserA = await User.createUser();
    const createdUserB = await User.createUser();

    const loggedUserA = await User.loginUser(createdUserA);

    const newUserData = await factory.attrs('User');

    const res = await request(server)
      .put(`/user/${createdUserB.id}`)
      .set('Authorization', `Bearer ${loggedUserA.body.token}`)
      .send(newUserData);

    expect(res.status).toBe(401);
  });
});
