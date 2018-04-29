// src/app/interface/block.interface.ts

export class Block {
  _id: string;
  height: number;
  node_number: string;
  address:  string;
  prev_hash:  string;
  merkle_root:  string;
  time:  string;
  nbits:  string;
  nonce:  string;
  created_date: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
