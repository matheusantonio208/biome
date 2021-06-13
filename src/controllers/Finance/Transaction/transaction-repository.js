import Transaction from '#schemas/Finance/Transaction.js';

class TransactionRepository {
  async getByIds(transactionsID) {
    const transactions = transactionsID.map(async (id) => {
      await Transaction.find({ _id: id });
    });
    if (transactions) return transactions;

    throw new Error(`Error to get ${transactionsID}`);
  }

  async create(transactionData) {
    const newTransaction = new Transaction(transactionData);

    if (newTransaction) {
      await newTransaction.save();
      return newTransaction;
    }

    throw new Error(`Could not create transaction ${transactionData.name}`);
  }
}

export default new TransactionRepository();
