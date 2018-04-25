// src/app/interface/key.interface.ts

export class Key {
  _id: string;
  private_key: string;
  public_key: string;
  wif: string;
  wif_compressed: string;
  address: string;
  node_number: string;
  amount: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
