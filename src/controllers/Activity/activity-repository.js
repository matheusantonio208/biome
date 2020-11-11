import Activity from '#schemas/Activity.js';

class ActivityRepository {
  async getOneById(userId, activityId) {
    const activityById = await Activity.findById(activityId);

    if (!activityById) {
      throw new Error(`Error to get ${activityId}. There is no activity registered
      with this id.`);
    }

    if (await this.checkOwnerUser(userId, activityById)) {
      return activityById;
    }
  }

  async getAllByUserId(userId) {
    const activities = await Activity.find({ id_owner_user: userId });

    if (activities) return activities;

    throw new Error(`Could not get activities fo user ${userId}`);
  }

  async create(userId, activityData) {
    if (activityData.id_owner_user !== userId) {
      throw new Error(
        `Could not create activity ${activityData.name}.
        The owner user must be logged in.`,
      );
    }

    const isActivityDuplicate = await this.checkActivityDuplicate(
      userId,
      activityData.name,
    );

    if (isActivityDuplicate) {
      throw new Error(
        `Could not create activity ${activityData.name}.
        You already have an activity registered with the same name.`,
      );
    }

    const newActivity = new Activity(activityData);

    if (newActivity) {
      await newActivity.save();
      return newActivity;
    }

    throw new Error(`Could not create activity ${activityData.name}`);
  }

  async update(userId, activityData) {
    const oldActivity = await Activity.findById(activityData._id);
    const newActivity = Object.assign(oldActivity, activityData);

    if (await this.checkOwnerUser(userId, activityData)) {
      const activity = await Activity.findByIdAndUpdate(
        activityData._id,
        newActivity,
      );
      return activity;
    }
    throw new Error(`Error to update ${activityData._name}`);
  }

  async delete(userId, activityId) {
    const activity = await Activity.findById(activityId);

    if (await this.checkOwnerUser(userId, activity)) {
      const activity = await Activity.findByIdAndUpdate(activityId, {
        status: 'disabled',
      });
      return activity;
    }
    throw new Error(`Error to delete ${activity._name}`);
  }

  async checkActivityDuplicate(userId, activityName) {
    const hasActivity = await Activity.findOne({
      id_owner_user: userId,
      name: activityName,
    });
    return !!hasActivity;
  }

  async checkOwnerUser(userId, activity) {
    const isIdEqual =
      String(userId) === String(activity.id_owner_user) ? true : false;

    if (!isIdEqual) {
      throw new Error(
        `Could not get activity ${activity._id}. The owner user must be logged in.`,
      );
    }

    return true;
  }
}

export default new ActivityRepository();
