import Wallet from '#schemas/Finance/Wallet.js';

class WalletRepository {
  async getAll(userID) {
    const walletsFound = await Wallet.find({ id_owner_user: userID });

    if (walletsFound) return walletsFound;

    throw new Error(`Error to get wallets of user ${userID}`);
  }

  async getOne(walletID) {
    const walletFound = await Wallet.findOne({ _id: walletID });

    if (walletFound) return walletFound;

    throw new Error(`Error to get ${walletID}`);
  }

  async create(walletData) {
    const newWallet = new Wallet(walletData);

    if (newWallet) {
      await newWallet.save();
      return newWallet;
    }

    throw new Error(`Could not create wallet ${newWallet.name}`);
  }

  async updateById(walletID, walletData) {
    if (await Wallet.findByIdAndUpdate(walletID, walletData)) {
      const updatedWallet = await Wallet.findOne({ _id: walletID });
      if (updatedWallet) return updatedWallet;
    }

    throw new Error(`Could not update wallet ${walletID}`);
  }

  async deleteById(walletID) {
    if (await Wallet.findByIdAndDelete(walletID))
      return { success_msg: 'Deleted!' };

    throw new Error(`It was not possible to delete the wallet ${walletID}`);
  }
}

export default new WalletRepository();
