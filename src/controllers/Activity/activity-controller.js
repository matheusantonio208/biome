import {
  activityValueObject,
  activityUpdateObject,
} from './activity-object.js';
import Activity from './activity-repository.js';

class ActivityController {
  async index(req, res) {
    try {
      const { userId } = req;
      const { activityId } = req.params;

      const activity = await Activity.getOneById(userId, activityId);

      return res.status(201).json(activity);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async show(req, res) {
    try {
      const { userId } = req;

      const activities = await Activity.getAllByUserId(userId);

      return res.status(201).json(activities);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async store(req, res) {
    try {
      const { userId } = req;

      const activityData = activityValueObject(req.body);
      const newActivity = await Activity.create(userId, activityData);

      return res.status(201).json(newActivity);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      const { activityId } = req.params;

      const activityData = activityUpdateObject({
        ...req.body,
        _id: activityId,
      });

      const updatedActivity = await Activity.update(userId, activityData);

      return res.status(201).json(updatedActivity);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;
      const { activityId } = req.params;

      await Activity.delete(userId, activityId);

      return res.status(201).json({ success_msg: `Delete Success!` });
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }
}

export default new ActivityController();
