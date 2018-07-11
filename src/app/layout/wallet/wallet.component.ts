import {Component, OnInit, ViewChild} from '@angular/core';
// import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECSignature, ECPair, crypto, networks} from 'bitcoinjs-lib';
import {KeyService} from '../../interface/key.service';
import {Key} from '../../interface/key.interface';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {createViewChild} from '@angular/compiler/src/core';

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

  alertMessage: string = null;
  private _alert: Subject<string>;

  subject$ = new Subject<NgbTooltip>();
  @ViewChild('copyPrivateKeyTooltip') copyPrivateKeyTooltip: NgbTooltip;
  @ViewChild('copyWifTooltip') copyWifTooltip: NgbTooltip;
  @ViewChild('copyAddressTooltip') copyAddressTooltip: NgbTooltip;

  constructor(
    private keyService: KeyService
  ) {
    this._alert = new Subject<string>();
  }

  ngOnInit() {
    this.tooltip(null);
    this.alert('');
  }

  generateKey() {
    try {
      const hash = crypto.sha256(Buffer.from(String(Math.floor(Math.random() * 100000)), 'utf-8'));
      const x = bigi.fromBuffer(hash);

      this.keyPair = new ECPair(x, null, {compressed: true, network: networks.bitcoin});
      this.privateKeyValue = this.keyPair.d.toHex();
      this.publicKeyValue = bigi.fromBuffer(this.keyPair.getPublicKeyBuffer()).toHex();
      this.wifCompValue = this.keyPair.toWIF();
      this.addressValue = this.keyPair.getAddress();

      const keyForCompressed = new ECPair(x, null, {compressed: false, network: networks.bitcoin});
      this.wifValue = keyForCompressed.toWIF();

      console.log('compAddress', keyForCompressed.getAddress());
      console.log('compPrivateKey', keyForCompressed.d.toHex());
    } catch (e) {
      this.alert(`Error: ${e.toLocaleString()}`);
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
          this.alert('저장되었습니다.');
          console.log('Key saved.');
        })
        .catch(response => {
          this.alert(`Error: ${response.errors}`);
          console.log('Key save fail.');
        });
    } catch (e) {
      this.alert(`Error: ${e.toLocaleString()}`);
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

  copyPrivateKey() {
    this.tooltip(this.copyPrivateKeyTooltip);
  }

  copyWif() {
    this.tooltip(this.copyWifTooltip);
  }

  copyAddress() {
    this.tooltip(this.copyAddressTooltip);
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

  alert(msg: string) {
    this._alert.next(msg);
    this._alert.subscribe((message) => { this.alertMessage = message; });
    debounceTime.call(this._alert, 5000).subscribe(() => { this.alertMessage = null; });
  }

}
