// src/app/transaction/transaction.interface.ts

export class Transaction {
  _id: string;
  height: number;
  hash_pointer: string;
  from: string;
  from_node: string;
  to: string;
  to_node: string;
  amount: string;
  created_date: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
