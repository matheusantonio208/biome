import { Router } from 'express';

import isAuth from '#middlewares/auth-middle.js';

import Activity from '#controllers/Activity/activity-controller.js';
import Transaction from '#controllers/Finance/Transaction/transaction-controller.js';
import Wallet from '#controllers/Finance/Wallet/wallet-controller.js';
import Session from '#controllers/User/session-controller.js';
import User from '#controllers/User/user-controller.js';

class Routes {
  constructor() {
    this.route = new Router();

    this.user('/user');
    this.session('/session');
    this.activity('/activity');
    this.finance('/finance');
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

  finance(baseRoute) {
    this.route.get(`${baseRoute}/wallet/`, isAuth, Wallet.show);
    this.route.get(`${baseRoute}/wallet/:walletId`, isAuth, Wallet.index);
    this.route.post(`${baseRoute}/wallet/`, isAuth, Wallet.store);
    this.route.put(`${baseRoute}/wallet/:walletId`, isAuth, Wallet.update);
    this.route.delete(`${baseRoute}/wallet/:walletId`, isAuth, Wallet.delete);

    this.route.post(`${baseRoute}/transaction`, isAuth, Transaction.store);
    this.route.delete(
      `${baseRoute}/transaction/:transactionId`,
      isAuth,
      Transaction.delete,
    );
    this.route.put(
      `${baseRoute}/transaction/:transactionId`,
      isAuth,
      Transaction.update,
    );
    this.route.get(`${baseRoute}/transaction/user`, isAuth, Transaction.show);
    this.route.get(
      `${baseRoute}/transaction/wallet/:walletId`,
      isAuth,
      Transaction.show,
    );
    this.route.get(
      `${baseRoute}/transaction/:transactionId`,
      isAuth,
      Transaction.index,
    );
  }
}

export default new Routes().route;
