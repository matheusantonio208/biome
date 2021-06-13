/*
 * [x] Listar Carteiras
 * [x] Detalhar Carteira
 * [x] Criar Carteira
 * [x] Atualizar Carteira
 * [x] Excluir Carteira
 */
import Wallet from './wallet-repository.js';

class WalletController {
  async show(req, res) {
    try {
      const { userId } = req;
      const walletsFound = await Wallet.getAll(userId);

      return res.status(201).json(walletsFound);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async index(req, res) {
    try {
      const { walletId } = req.params;
      const walletFound = await Wallet.getOne(walletId);

      return res.status(201).json(walletFound);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async store(req, res) {
    try {
      const newWallet = req.body;
      const { userId } = req;

      const walletCreated = await Wallet.create({
        ...newWallet,
        id_owner_user: userId,
      });

      return res.status(201).json(walletCreated);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async update(req, res) {
    try {
      const { walletId } = req.params;
      const walletData = req.body;

      const updatedWallet = await Wallet.updateById(walletId, walletData);

      return res.status(201).json(updatedWallet);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const { walletId } = req.params;
      const deletedWallet = await Wallet.deleteById(walletId);

      return res.status(200).json(deletedWallet);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new WalletController();
