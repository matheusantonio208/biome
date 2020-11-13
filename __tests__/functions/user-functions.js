import request from 'supertest';
import server from '#config/server/api-config.js';

import factory from '../utils/factories.js';

export const createUser = async () => {
  const userData = await factory.attrs('User');

  const newUser = await request(server)
    .post('/user/registration')
    .send(userData);

  return newUser;
};

export const loginUser = async (createdUser) => {
  const loggedUser = await request(server).post('/session/login').send({
    email: createdUser.body.email,
    password_hash: createdUser.body.password_hash,
  });

  return loggedUser;
};
