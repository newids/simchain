import {Component, OnInit, ViewChild} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {WordArray} from 'crypto-js';
import {interceptingHandler} from '@angular/common/http/src/module';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

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
  lenPlaintext = 0;
  lenCiphertext = 0;

  alertMessage: string;
  private _alert = new Subject<string>();

  @ViewChild('copyTextTooltip') copyTextTooltip: NgbTooltip;
  @ViewChild('copyHashedTooltip') copyHashedTooltip: NgbTooltip;
  @ViewChild('copyTextTooltip2') copyTextTooltip2: NgbTooltip;
  @ViewChild('copyHashedTooltip2') copyHashedTooltip2: NgbTooltip;

  private subject$ = new Subject();

  alert(msg: string) {
    this._alert.next(msg);
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  constructor() {
  }

  ngOnInit() {
    this.tooltip(null);
    this.alert('');
  }

  cmdEncryptClick() {
    try {
      const c = CryptoJS.AES.encrypt(this.txtPlaintext, this.passphrase);
      this.txtCiphertext = c.toString();
    } catch (e) {
      this.alert(`Error: ${new Date()} - ${e.toLocaleString()}`);
      console.log(e.toLocaleString());
    }
  }

  genPassphrase() {
    try {
      const d = String(Math.floor(Math.random() * 10000));
      const b = this.getHash(d, this.selKeySize);
      this.passphrase = b;

      const textA = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper a quam ac rhoncus. Suspendisse condimentum congue leo vel convallis.';
      const textB = 'Vivamus ac eleifend purus, at vehicula felis. Sed ornare suscipit imperdiet. Maecenas eu eros nibh. Phasellus non imperdiet urna, eget volutpat nisl. Nulla lacinia quam ac mi bibendum, eu sagittis quam tincidunt. Nulla vel congue erat. Aenean pulvinar venenatis pellentesque. Suspendisse tempus augue id vestibulum pretium. Aenean ac semper augue. Vivamus ultrices ante ac pulvinar pellentesque. Ut semper condimentum aliquet.\n Nulla eget velit urna. Phasellus sit amet vulputate erat, vitae volutpat velit. Curabitur at elit porttitor, cursus neque at, pretium lectus. Praesent bibendum ullamcorper nulla a mattis. Suspendisse non facilisis tortor. Nulla facilisi. Morbi porttitor vehicula consequat. In id mattis sapien. Nullam ut augue nunc. Nullam eget odio viverra, tempus felis quis, lobortis ipsum. Aenean sit amet lacus molestie, pretium nisi eget, sodales leo. Fusce luctus ultrices tempor.';
      const r = Math.floor(Math.random() * 10000 + 1);
      const random = String(r);

      this.txtPlaintext = `${textA} +0OIl/ ${random}.\n${textB}`;
      this.lenPlaintext = this.txtPlaintext.length;
    } catch (e) {
      this.alert(`Error: ${new Date()} - ${e.toLocaleString()}`);
      return -1;
    }
  }

  getPassphrase() {
    this.passphrase2 = this.passphrase;
  }

  getCiphertext() {
    this.txtCiphertext2 = this.txtCiphertext;
    this.lenCiphertext = this.txtCiphertext2.length;
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
      this.alert(`Error: ${new Date()} - ${e.toLocaleString()}`);
      console.log(e.toLocaleString());
    }
  }

  copyText() {
    this.tooltip(this.copyTextTooltip);
  }

  tooltip(object: NgbTooltip) {
    this.subject$.next(object);
    this.subject$.subscribe((tooltip: NgbTooltip) => {
      tooltip.open();
    });
    debounceTime.call(this.subject$, 2000).subscribe((tooltip) => {
      tooltip.close();
    });
  }

}
