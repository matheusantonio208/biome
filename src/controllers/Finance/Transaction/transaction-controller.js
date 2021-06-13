import Transaction from './transaction-repository.js';

class TransactionController {
  async store(req, res) {
    try {
      const { userId } = req;

      const transactionData = {
        ...req.body,
        id_owner_user: userId,
      };
      const newTransaction = await Transaction.create(transactionData);

      return res.status(201).json(newTransaction);
    } catch (error) {
      return res.status(400).json({ error_msg: `${error}` });
    }
  }

  async show(req, res) {
    try {
      const { userId } = req;
      const { walletId } = req.params;

      const transactions = await Transaction.getByUserAndOrWalletId(
        userId,
        walletId,
      );

      return res.status(201).json(transactions);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async index(req, res) {
    try {
      const { transactionId } = req.params;
      const transactionFound = await Transaction.getOne(transactionId);

      return res.status(201).json(transactionFound);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async update(req, res) {
    try {
      const { transactionId } = req.params;
      const transactionData = req.body;

      const updatedTransaction = await Transaction.updateById(
        transactionId,
        transactionData,
      );

      return res.status(201).json(updatedTransaction);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }

  async delete(req, res) {
    try {
      const { transactionId } = req.params;

      const trasactionDeleted = await Transaction.deleteById(transactionId);

      return res.status(201).json(trasactionDeleted);
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }
}

export default new TransactionController();
