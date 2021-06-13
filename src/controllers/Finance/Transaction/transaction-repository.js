import Transaction from '#schemas/Finance/Transaction.js';

class TransactionRepository {
  async getByUserAndOrWalletId(userId, walletId) {
    let transactions;

    if (walletId) {
      transactions = await Transaction.find({
        id_owner_user: userId,
        id_wallet: walletId,
      });
      return transactions;
    }

    transactions = await Transaction.find({
      id_owner_user: userId,
    });
    return transactions;
  }

  async getOne(transactionId) {
    const transaction = await Transaction.findOne({ _id: transactionId });

    if (transaction) return transaction;

    throw new Error(`Error to get ${transactionId}`);
  }

  async create(transactionData) {
    const newTransaction = new Transaction(transactionData);

    if (newTransaction) {
      await newTransaction.save();
      return newTransaction;
    }

    throw new Error(`Could not create transaction ${transactionData.name}`);
  }

  async updateById(transactionId, transactionData) {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      transactionData,
      { new: true },
    );

    if (transaction) return transaction;

    throw new Error(`Could not update transaction ${transactionId}`);
  }

  async deleteById(transactionId) {
    if (await Transaction.findByIdAndDelete(transactionId)) {
      return { success_msg: 'Deleted!' };
    }
    throw new Error(`Could not delete transaction ${transactionId}`);
  }
}

export default new TransactionRepository();
