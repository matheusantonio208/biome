 /*
  * [x] Criar Transação
  * [x] Capturar 1 ou várias transações
  * [ ] Capturar Todas as Transações de 1 carteira
  * [ ] Atualizar 1 transação
  * [ ] Deletar 1 ou várias transações
  */
import Transaction from './transaction-repository.js';
import { walletTransactionObject } from './transaction-object.js';

class TransactionController {
  async store(req, res) {
    try {
      const { userId } = req

      const transactionData = walletTransactionObject({ ...req.body, id_owner_user: userId });
      const newTransaction = await Transaction.create( transactionData );

      return res.status(201).json(newTransaction);
    } catch (error) {
      return res.status(400).json({ error_msg: `${error}` });
    }
  }

  async show(req, res) {
    try {
      const ids = req.query.id;
      const transactionsFind = await Transaction.getByIds(ids);

      return res.status(201).json({ success_msg: `Success! Your object is ${await Promise.all(transactionsFind)}` });
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }
}

export default new TransactionController();

/*
async index(req, res) {
    try {
      const { _id : transactionID } = walletTransactionObject(req.body);
      const transactionFind = await Transaction.get(transactionID);

      return res.status(201).json({ success_msg: `Success! Your object is ${transactionFind}` });
    } catch (error) {
      return res.status(401).json({ error_msg: `${error}` });
    }
  }
*/
