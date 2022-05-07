import Activity from '#schemas/LifeStyle/Activity.js';

class ActivityRepository {
  async getOneById(userIdLogged, activityId) {
    const isOwnerUser = await this.checkOwnerUser(userIdLogged, activityId);
    const activity = await Activity.findById(activityId);

    if (isOwnerUser) {
      return activity;
    }

    throw new Error(`No activity found with id ${activityId}`);
  }

  async getAllByUserId(userIdLogged) {
    const activities = await Activity.find({ id_owner_user: userIdLogged });

    if (activities) return activities;

    throw new Error(`Could not get activities fo user ${userIdLogged}`);
  }

  async create(userIdLogged, activityData) {
    await this.checkActivityDuplicate(userIdLogged, activityData);

    const newActivity = new Activity(activityData);

    if (newActivity) {
      await newActivity.save();
      return newActivity;
    }

    throw new Error(`Could not create activity ${activityData.name}`);
  }

  async update(userIdLogged, activityData) {
    const activityId = activityData._id;

    const isOwnerUser = await this.checkOwnerUser(userIdLogged, activityId);
    const isDuplicate = await this.checkActivityDuplicate(
      userIdLogged,
      activityData,
    );

    if (isOwnerUser && !isDuplicate) {
      const updatedActivity = await Activity.findByIdAndUpdate(activityId, {
        ...activityData,
      });

      return updatedActivity;
    }

    throw new Error(`Error to update ${activityData.name}`);
  }

  async delete(userIdLogged, activityId) {
    const isOwnerUser = await this.checkOwnerUser(userIdLogged, activityId);

    if (isOwnerUser) {
      const disabledActivity = await Activity.findByIdAndUpdate(activityId, {
        status: 'disabled',
      });

      return disabledActivity;
    }

    throw new Error(`Error to delete ${activityId}`);
  }

  async checkActivityDuplicate(userIdLogged, activity) {
    const hasDuplicate = await Activity.findOne({
      id_owner_user: userIdLogged,
      name: activity.name,
    });

    if (!hasDuplicate) {
      return false;
    }

    throw new Error(`You already have an activity with this name.`);
  }

  async checkOwnerUser(userIdLogged, activityId) {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      throw new Error(`No activity found with id ${activityId}`);
    }

    console.log({ checkOwnerUser: { activity } });

    console.log({
      checkOwnerUser: { userIdLogged, id_owner_user: activity.id_owner_user },
    });

    const isOwnerUser = String(userIdLogged) === String(activity.id_owner_user);

    if (isOwnerUser) return true;

    throw new Error(`The user who owns activity must be logged.`);
  }
}

export default new ActivityRepository();
