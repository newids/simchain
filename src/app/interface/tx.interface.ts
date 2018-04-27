// src/app/interface/tx.interface.ts

export class Tx {
  _id: string;
  height: string;
  hash_pointer: string;
  from: string;
  from_node: string;
  to: string;
  to_node: string;
  amount: number;
  created_date: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
