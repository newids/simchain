import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {WordArray} from 'crypto-js';
import {interceptingHandler} from '@angular/common/http/src/module';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-symmetric-key',
  templateUrl: './symmetric-key.component.html',
  styleUrls: ['./symmetric-key.component.css']
})
export class SymmetricKeyComponent implements OnInit {
  selKeySize = '128';
  selMode = 'CBC';
  selPad = 'Pkcs7';
  passphrase: string;
  txtPlaintext: string;
  txtCiphertext: string;
  passphrase2: string;
  txtCiphertext2: string;
  txtPlaintext2: string;
  alertMessage: string;
  private _alert = new Subject<string>();

  alert() {
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  constructor() {
  }

  ngOnInit() {
  }

  cmdEncryptClick() {
    try {
      const c = CryptoJS.AES.encrypt(this.txtPlaintext, this.passphrase);
      this.txtCiphertext = c.toString();
    } catch (e) {
      const msg = e.toLocaleString();
      this._alert.next(`Error: ${new Date()} - ${msg}`);
      this.alert();
    }
  }

  genPassphrase() {
    try {
      const d = String(Math.floor(Math.random() * 10000));
      const b = this.getHash(d, this.selKeySize);
      this.passphrase = b;
    } catch (a) {
      this._alert.next(`${new Date()} - Error: Fail to generate pass phrase.`);
      this.alert();
      return -1;
    }
  }

  getPassphrase() {
    this.passphrase2 = this.passphrase;
  }

  getCiphertext() {
    this.txtCiphertext2 = this.txtCiphertext;
  }

  getHash(c: string, e: string): string {
    let d;
    const b: number = Number(e);
    if (b === 128) {
      d = CryptoJS.SHA256(c).toString().substring(0, 128 / 4);
    } else {
      if (b === 192) {
        d = CryptoJS.SHA256(c).toString().substring(0, 192 / 4);
      } else {
        if (b === 256) {
          d = CryptoJS.SHA256(c);
        }
      }
    }
    return d;
  }

  cmdDecryptClick() {
    try {
      const bytes = CryptoJS.AES.decrypt(this.txtCiphertext2, this.passphrase2);
      this.txtPlaintext2 = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      const msg = e.toLocaleString();
      this._alert.next(`Error: ${new Date()} - ${msg}`);
      this.alert();
    }
  }

  clearText() {
    this.passphrase2 = '';
    this.passphrase = '';
    this.txtPlaintext = '';
    this.txtPlaintext2 = '';
    this.txtCiphertext = '';
    this.txtCiphertext2 = '';
  }

}
