import {Component, OnInit} from '@angular/core';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECPair} from 'bitcoinjs-lib';
import {KeyService} from '../../interface/key.service';
import {Key} from '../../interface/key.interface';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

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
  alertMessage: string = '';
  private _alert: Subject<string>;

  alert() {
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  constructor(
    private keyService: KeyService
  ) {
    this._alert = new Subject<string>();
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
      this._alert.next(`Error: ${new Date()} - ${e.toLocaleString()}`);
      this.alert();
      console.log('error:', e.toLocaleString());
    }
  }

  registerKey() {
    try {
      const key = {
        'private_key': this.keyPair.d.toHex(),
        'public_key': this.publicKeyValue,
        'wif': this.wifValue,
        'wif_compressed': this.wifCompValue,
        'address': this.addressValue,
        'node_number': localStorage.getItem('node_number'),
        'amount': 0
      };
      this.keyService.create(key as Key)
        .then(data => {
          this._alert.next('저장되었습니다.');
          this.alert();
          console.log('Key saved.');
        })
        .catch(response => {
          this._alert.next(`Error: ${new Date()} - ${response.errors}`);
          this.alert();
          console.log('Key save fail.');
        });
    } catch (e) {
      this._alert.next(`Error: ${new Date()} - ${e.toLocaleString()}`);
      this.alert();
      console.log('error:', e.toLocaleString());
    }
  }

  clearForm() {
    this.privateKeyValue = '';
    this.publicKeyValue = '';
    this.wifCompValue = '';
    this.wifValue = '';
    this.addressValue = '';
    this.keyPair = null;
    this.alertMessage = null;
  }

}
