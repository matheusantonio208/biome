import BeeQueue from 'bee-queue';

import redisConfig from '#config/redisDB/redis-config.js';

import emailDeletedUser from '#jobs/emails/User/DeletedUser.js';
import emailUpdatedUserEmail from '#jobs/emails/User/UpdatedUserEmail.js';
import emailUpdatedUserPassword from '#jobs/emails/User/UpdatedUserPassword.js';
import emailWelcomeNewUser from '#jobs/emails/User/WelcomeNewUser.js';

const jobs = [
  emailWelcomeNewUser,
  emailUpdatedUserEmail,
  emailUpdatedUserPassword,
  emailDeletedUser,
];

class JobQueue {
  constructor() {
    this.jobQueues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.jobQueues[key] = {
        bee: new BeeQueue(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(key, job) {
    return this.jobQueues[key].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.jobQueues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new JobQueue();
