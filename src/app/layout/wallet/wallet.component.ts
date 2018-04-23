import { Component, OnInit } from '@angular/core';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECPair} from 'bitcoinjs-lib';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  privateKeyValue = '';
  publicKeyValue = '';
  wifCompValue = '';
  wifValue = '';
  addressValue = '';
  keyPair: ECPair;
  lodash: '';
  networks: '';
  network: '';

  constructor() {
  }

  ngOnInit() {
  }

  generateKey() {
    try {
      const hash = bitcoin.crypto.sha256(Buffer.from(String(Math.floor(Math.random() * 100000)), 'utf-8'));
      const x = bigi.fromBuffer(hash);

      this.keyPair = new bitcoin.ECPair(x, null, {compressed: true, network: bitcoin.networks.bitcoin});
      this.privateKeyValue = this.keyPair.d.toHex();
      this.publicKeyValue = bigi.fromBuffer(this.keyPair.getPublicKeyBuffer()).toHex();
      this.wifCompValue = this.keyPair.toWIF();
      this.addressValue = this.keyPair.getAddress();

      const keyForCompressed = new bitcoin.ECPair(x, null, {compressed: false, network: bitcoin.networks.bitcoin});
      this.wifValue = keyForCompressed.toWIF();

      console.log('compAddress', keyForCompressed.getAddress());
      console.log('compPrivateKey', keyForCompressed.d.toHex());
    } catch (e) {
      console.log('error:', e.toLocaleString());
    }
  }

  registerKey() {
    try {
      this.addressValue;
    } catch (e) {
      console.log('error:', e.toLocaleString());
    }

  }
}
