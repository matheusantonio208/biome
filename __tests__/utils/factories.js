import { factory } from 'factory-girl';
import mongoose from 'mongoose';
import faker from 'faker';


import User from '#schemas/User.js';
import Activity from '#schemas/LifeStyle/Activity.js';

factory.define('User', User, {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password_hash: faker.internet.password(),
  photo_profile: faker.image.people(),
  date_birth: faker.date.past(),
  phone_number: faker.phone.phoneNumber(),
  country: faker.address.country(),
  state: faker.address.state(),
  group: 'admin',
  date_last_login: faker.date.past(),
  locale_last_login: `${faker.address.latitude()};${faker.address.longitude()}`,
});

factory.define('Activity', Activity, {
  id_owner_user: mongoose.Types.ObjectId,
  name: faker.lorem.word(),
  date_start: faker.date.past(),
  date_end: faker.date.future(),
  execution_time: [{
    moment_start: 480,
    moment_end: 660,
  }],
  days_week: [1, 3, 5],
  pillar: 'body',
  status: 'active',
})

export default factory;
