import Wallet from '#schemas/Finance/Wallet.js';

class WalletRepository {
  async getOne({_id}) {
    const wallet = await Wallet.findOne({_id});

    if(wallet) return wallet;

    throw new Error(`Error to get ${_id}`);
  }

  async create(walletData) {
    const newWallet = new Wallet(walletData);

    if(newWallet) {
      await newWallet.save();
      return newWallet;
    }

    throw new Erro(`Could not create wallet ${newWallet.name}`);
  }
}

export default new WalletRepository();
