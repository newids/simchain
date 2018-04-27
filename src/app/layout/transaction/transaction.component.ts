import { Component, OnInit } from '@angular/core';
import {Tx} from '../../interface/tx.interface';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECPair} from 'bitcoinjs-lib';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  from;
  to;
  amount;
  tx_raw;
  tx;
  private_key;

  constructor() { }

  ngOnInit() {
  }

  generator() {
    this.tx = new Tx({
      _id: 0,
      height: 0,
      hash_pointer: '',
      from: this.from,
      from_node: '',
      to: this.to,
      to_node: '',
      amount: this.amount,
      created_date: Date.now(),
      });

    // this.tx_raw = JSON.stringify(tx);
  }

  sign() {
    this.public_key_from_private_key();
    // try {
    //   let keyPair = new bitcoin.ECPair()
    //   const encrypted = this.rsaKeyPair.encrypt(this.inputValue, 'base64');
    //   this.encryptedOutput = encrypted;    // setMaxDigits(38);
    // } catch (e) {
    //   console.log('error:', e.toLocaleString());
    //   this.encryptedOutput = '';
    // }
    // this.decryptedOutput = '';










    // const ciphertext = rsa.encryptedString(key, this.inputValue);
    // const json_string: string = JSON.stringify(ciphertext);
    // this.encryptedOutput = json_string;

    // const hash = bitcoin.crypto.sha256(Buffer.from(this.inputValue, 'utf-8'));
    // const signature = this.keyPair.sign(hash);
    // this.encryptedOutput = bigi.fromBuffer(signature.toDER()).toHex();
  }

  broadcasting() {

  }


  public_key_from_private_key() {

//     this.private_key = 'd07a402c8f705d35d0e085ac7c67728c8105bea8a9c41006faaac91dc6742bd7';
//     const privKeyBuf = new Buffer(this.private_key, 'hex');
//     const privKeyBI = bigi.fromBuffer(privKeyBuf);
//
// // compressed
//     const compressed = true;
//     const privKey = new bitcoin.ECKey(privKeyBI, compressed);
//     console.log(privKey.pub.toHex());
//
// // uncompressed
//     compressed = false;
//     privKey = new bitcoin.ECKey(privKeyBI, compressed);
//     console.log(privKey.pub.toHex());


  }
}
