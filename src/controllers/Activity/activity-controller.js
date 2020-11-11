import Activity from './activity-repository.js';
import { activityValueObject, activityUpdateObject } from './activity-object.js';

class ActivityController {
  async index(req, res) {
    try {
      const userId = req.userId;
      const activityId = req.params.activityId || req.body._id;

      const activityFind = await Activity.getOneById(userId, activityId);

      return res.status(201).json(activityFind);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }

  async show(req, res) {
    try {
      const userId = req.userId;

      const activities = await Activity.getAllByUserId(userId);

      return res.status(201).json(activities);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }

  async store(req, res) {
    try {
      const userId = req.userId;
      const activityData = activityValueObject(req.body);
      const newActivity = await Activity.create(userId, activityData);

      return res.status(201).json(newActivity);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }

  async update(req, res) {
    try {
      const userId = req.userId;
      const activityObject = activityUpdateObject(req.body);

      const activity = await Activity.update(userId, activityObject);

      return res.status(201).json(activity);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }

  async delete(req, res) {
    try {
      const userId = req.userId;
      const activityId = req.params.activityId;

      await Activity.delete(userId, activityId);

      return res.status(201).json({ success_msg: `Delete Success!` });
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }
}

export default new ActivityController();
