import { Component, OnInit } from '@angular/core';
import {Tx} from '../../interface/tx.interface';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECPair} from 'bitcoinjs-lib';
import * as secp256k1 from 'secp256k1';

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
    // http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
    // https://github.com/cryptocoinjs/secp256k1-node

    const hash = bitcoin.crypto.sha256(Buffer.from(String(Math.floor(Math.random() * 100000)), 'utf-8'));
    const x = bigi.fromBuffer(hash);

    const keypair = new bitcoin.ECPair(x, null, {compressed: true, network: bitcoin.networks.bitcoin});
    const privKey = keypair.d;

    const pubKey = secp256k1.publicKeyCreate(privKey.toBuffer(32));

    console.log('privKey = keypair.privKey : ', keypair.d.toHex());
    console.log('keypair.pubKey : ', bigi.fromBuffer(keypair.getPublicKeyBuffer()).toHex());
    console.log('pubKey : ', bigi.fromBuffer(pubKey).toHex());
  }
}
