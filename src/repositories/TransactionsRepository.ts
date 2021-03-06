import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTD {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
     return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator,transaction)=>{
        switch(transaction.type){
          case "income":
            acumulator.income+=transaction.value
            break
          case "outcome":
            acumulator.outcome+=transaction.value
            break
          default:
            break

        }
        acumulator.total =  acumulator.income -  acumulator.outcome
        return acumulator
    },{
      income:0,
      outcome:0,
      total:0
    })
    //this.transactions.push(balance)
    return balance
  }

  public create({title,value,type}:CreateTransactionDTD): Transaction {

    const transaction = new Transaction({
      title,
      value,
      type
  })
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
