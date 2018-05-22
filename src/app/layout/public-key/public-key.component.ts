import {Component, OnInit, ViewChild} from '@angular/core';
import * as bigi from 'bigi';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

//  library : https://www.npmjs.com/package/node-rsa
//  package.json 수정 : https://stackoverflow.com/questions/47486774/crypto-randombytes-is-not-a-function-in-angular


@Component({
  selector: 'app-public-key',
  templateUrl: './public-key.component.html',
  styleUrls: ['./public-key.component.css'],
})
export class PublicKeyComponent implements OnInit {
  privatekeyValue = '';
  publickeyValue = '';
  inputValue = '평문을 입력해 주세요.';
  encryptedOutput = '';
  decryptedOutput = '';
  rsaKeyPair;

  alertMessage: string;
  private _alert = new Subject<string>();

  private subject$ = new Subject<NgbTooltip>();

  @ViewChild('copyPrivateTooltip') copyPrivateTooltip: NgbTooltip;
  @ViewChild('copyPublicTooltip') copyPublicTooltip: NgbTooltip;

  constructor() {
  }

  ngOnInit() {
    this.tooltip(null);
    this.alert('');
  }

  newPrivateKey() {
    try {
      const NodeRSA = require('node-rsa');
      this.rsaKeyPair = new NodeRSA({b: 512});
      const privateKey = this.rsaKeyPair.exportKey('pkcs1-der');
      const publicKey = this.rsaKeyPair.exportKey('pkcs8-public-der');
      this.privatekeyValue = this.privatekeyValue = bigi.fromBuffer(privateKey).toHex();
      this.publickeyValue = this.publickeyValue = bigi.fromBuffer(publicKey).toHex();
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.alert(`Error: ${e.toLocaleString()}`);
      this.encryptedOutput = '';
      this.decryptedOutput = '';
    }
  }

  encryptPublic() {
    try {
      const encrypted = this.rsaKeyPair.encrypt(this.inputValue, 'base64');
      this.encryptedOutput = encrypted;    // setMaxDigits(38);
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.alert(`Error: ${e.toLocaleString()}`);
      this.encryptedOutput = '';
    }
    this.decryptedOutput = '';
  }

  decryptPrivate() {
    try {
      const decrypted = this.rsaKeyPair.decrypt(Buffer.from(this.encryptedOutput, 'base64'), 'utf-8');
      this.decryptedOutput = decrypted;
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.alert(`Error: ${e.toLocaleString()}`);
      this.decryptedOutput = '';
    }
  }

  encryptPrivate() {
    try {
      const encrypted = this.rsaKeyPair.encryptPrivate(this.inputValue, 'base64');
      this.encryptedOutput = encrypted;    // setMaxDigits(38);
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.alert(`Error: ${e.toLocaleString()}`);
      this.encryptedOutput = '';
    }
    this.decryptedOutput = '';
  }

  decryptPublic() {
    try {
      const decrypted = this.rsaKeyPair.decryptPublic(Buffer.from(this.encryptedOutput, 'base64'), 'utf-8');
      this.decryptedOutput = decrypted;
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.alert(`Error: ${e.toLocaleString()}`);
      this.decryptedOutput = '';
    }
  }

  randomText() {
    const textA = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper a quam ac rhoncus. Suspendisse condimentum congue leo vel convallis.';
    const textB = 'Vivamus ac eleifend purus, at vehicula felis. Sed ornare suscipit imperdiet. Maecenas eu eros nibh. Phasellus non imperdiet urna, eget volutpat nisl. Nulla lacinia quam ac mi bibendum, eu sagittis quam tincidunt. Nulla vel congue erat. Aenean pulvinar venenatis pellentesque. Suspendisse tempus augue id vestibulum pretium. Aenean ac semper augue. Vivamus ultrices ante ac pulvinar pellentesque. Ut semper condimentum aliquet.\n Nulla eget velit urna. Phasellus sit amet vulputate erat, vitae volutpat velit. Curabitur at elit porttitor, cursus neque at, pretium lectus. Praesent bibendum ullamcorper nulla a mattis. Suspendisse non facilisis tortor. Nulla facilisi. Morbi porttitor vehicula consequat. In id mattis sapien. Nullam ut augue nunc. Nullam eget odio viverra, tempus felis quis, lobortis ipsum. Aenean sit amet lacus molestie, pretium nisi eget, sodales leo. Fusce luctus ultrices tempor.';
    const r = Math.floor(Math.random() * 1000000 + 1);
    const random = String(r);

    this.inputValue = `${textA} +0OIl/ ${random}.\n${textB}`;
  }

  copyPrivateKey() {
    this.tooltip(this.copyPrivateTooltip);
  }

  copyPublicKey() {
    this.tooltip(this.copyPublicTooltip);
  }

  tooltip(object: NgbTooltip) {
    this.subject$.next(object);
    this.subject$.subscribe((tooltip: NgbTooltip) => {
      tooltip.open();
    });
    debounceTime.call(this.subject$, 1000).subscribe((tooltip) => {
      tooltip.close();
    });
  }

  alert(msg: string) {
    this._alert.next(msg);
    this._alert.subscribe((message) => { this.alertMessage = message; });
    debounceTime.call(this._alert, 5000).subscribe(() => { this.alertMessage = null; });
  }

}
