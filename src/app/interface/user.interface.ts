// src/app/interface/user.interface.ts

export class User {
  _id: string;
  email: string;
  node_number: string;
  hash: string;
  salt: string;
  nbits: string;
  status: string;
  balance: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
