import { Router } from 'express';

import isAuth from '#middlewares/auth-middle.js';

import Session from '#controllers/User/session-controller.js';
import User from '#controllers/User/user-controller.js';

import Activity from '#controllers/Activity/activity-controller.js';

import Wallet from '#controllers/Finance/Wallet/wallet-controller.js';
import Transaction from '#controllers/Finance/Transaction/transaction-controller.js';

class Routes {
  constructor() {
    this.route = new Router();

    this.user('/user');
    this.session('/session');
    this.activity('/activity');
    this.wallet('/finance/wallet')
    this.transaction('/finance/transaction')
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

  activity(baseRoute) {
    this.route.get(`${baseRoute}/:activityId`, isAuth, Activity.index);
    this.route.get(`${baseRoute}/`, isAuth, Activity.show);
    this.route.post(`${baseRoute}/`, isAuth, Activity.store);
    this.route.put(`${baseRoute}/:activityId`, isAuth, Activity.update);
    this.route.delete(`${baseRoute}/:activityId`, isAuth, Activity.delete);
  }

  wallet(baseRoute) {
    this.route.get(`${baseRoute}:/walletId`, isAuth, Wallet.index);
    this.route.post(`${baseRoute}`, isAuth, Wallet.store);
  }

  transaction(baseRoute) {
    this.route.post(`${baseRoute}`, isAuth, Transaction.store);
    this.route.get(`${baseRoute}`, isAuth, Transaction.show);
  }
}

export default new Routes().route;
