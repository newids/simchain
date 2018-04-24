// src/app/user.interface.ts

export interface User {
  _id: string;
  email: string;
  node_number: string;
  hash: string;
  salt: string;
  nbits: string;
  status: string;
  balance: number;
}
