import Wallet from './wallet-repository.js';
import { wallet } from './wallet-object.js';

class WalletController {
  async index(req, res) {
    try {
      const walletObject = wallet(req.body);
      const walletFind = await Wallet.getOne(walletObject);

      return res.status(201).json({ success_msg: `Success! Your object is ${walletFind}` });
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}`});
    }
  }
  async store(req, res) {
    try {
      const newWallet = wallet(req.body);
      await Wallet.create({id_owner_user: req.userId,...newWallet});

      return res.status(201).json(newWallet);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new WalletController();
