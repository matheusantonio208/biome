import { Router } from 'express';

import isAuth from '#middlewares/auth-middle.js';

import User from '#controllers/User/user-controller-root.js';
import Session from '#controllers/User/session-controller.js';

class Routes {
  constructor() {
    this.route = new Router();

    this.route.get('/', (req, res) => {
      return res.status(200).json({ success_msg: 'Hello!' });
    });

    this.user('/user');
    this.session('/session');
  }

  user(baseRoute) {
    this.route.post(`${baseRoute}/registration`, User.store);
    this.route.get(`${baseRoute}/:userId`, isAuth, User.show);
    this.route.put(`${baseRoute}/:userId`, isAuth, User.update);
    this.route.delete(`${baseRoute}/:userId`, isAuth, User.delete);
  }

  session(baseRoute) {
    this.route.post(`${baseRoute}/login`, Session.store);
  }
}

export default new Routes().route;
