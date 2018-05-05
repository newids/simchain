import {Component, OnInit} from '@angular/core';
import {Tx} from '../../interface/tx.interface';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import * as secp256k1 from 'secp256k1';
import {KeyService} from '../../interface/key.service';
import {Key} from '../../interface/key.interface';
import {Network} from 'bitcoinjs-lib';
import {ECSignature} from 'bitcoinjs-lib';
import {TxService} from '../../interface/tx.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  from;
  to;
  amount = 10;
  tx_raw;
  tx;
  sha256;
  signature;
  verified;
  private_key;
  public_key;
  keyPair;
  keyList: Key[];
  alertMessage;

  constructor(private keyService: KeyService, private txService: TxService) {
  }

  ngOnInit() {
  }

  generate() {
    this.tx = new Tx({
      height: -1,
      hash_pointer: '',
      from: this.from,
      to: this.to,
      amount: this.amount,
      created_date: Date.now(),
    });

    // this.tx_raw = JSON.stringify(tx);
  }

  sign() {
    try {
    const keyPair = this.public_key_from_private_key();

    console.log('json : ', JSON.stringify(this.tx));
    this.sha256 = bigi.fromBuffer(bitcoin.crypto.sha256(Buffer.from(JSON.stringify(this.tx)))).toHex();
    console.log('sha256 : ', this.sha256);
    const ecSignature = keyPair.sign(bitcoin.crypto.sha256(Buffer.from(JSON.stringify(this.tx))));
    this.signature = bigi.fromBuffer(ecSignature.toDER()).toHex();
    console.log('signature : ', this.signature);
    } catch (e) {
      this.verified = e.toLocaleString();
    }
  }

  verify() {
    try {
      const testKeyPair = bitcoin.ECPair.fromPublicKeyBuffer(Buffer.from(this.public_key, 'hex'), bitcoin.networks.bitcoin);
      console.log('test public_key: ', this.keyList[0].public_key);
      console.log('gen public_key: ', bigi.fromBuffer(testKeyPair.getPublicKeyBuffer()).toHex());
      console.log('test private_key: ', this.keyList[0].private_key);
      // console.log('gen private_key: ', testKeyPair.d.toHex()); -------> ERROR TypeError: Cannot read property 'toHex' of undefined

      // const isVerified = testKeyPair.verify(Buffer.from(this.signature),
      // bitcoin.ECSignature.fromDER(Buffer.from(this.signature)));

      const hash = Buffer.from(this.sha256, 'hex');
      const signature = bitcoin.ECSignature.fromDER(Buffer.from(this.signature, 'hex'));
      const isVerified = testKeyPair.verify(hash, signature);

      this.verified = isVerified.toLocaleString();
    } catch (e) {
      this.verified = e.toLocaleString();
    }
  }

  broadcast() {
    try {
      this.txService.get_address_balance(this.from)
        .then((data) => {
          const balance = data[0]['total'];
          console.log('data: ', data);
          console.log('data.total: ', data[0]['total']);
          console.log('this.amount: ', this.amount);
          if (balance >= this.amount) {
            this.save_request();
          } else {
            this.verified = 'Balance Too Low.';
          }
        })
        .catch(response => {
          this.verified = 'Rejected.';
        });
    } catch (e) {
      console.log('error: ', e.toLocaleString());
    }
  }

  save_request() {
    const newTx = new Tx({
      height: -1,
      hash_pointer: 'hash_pointer',
      from: this.from,
      from_node: localStorage.getItem('node_number'),
      to: this.to,
      to_node: 'unknown',
      amount: this.amount,
      created_date: this.tx.created_date,
    });

    try {
      this.txService.create_tx_request(newTx)
        .then(tx => {
          this.verified = 'Saved.';
        })
        .catch(response => {
          this.verified = 'Rejected.';
        });
    } catch (e) {
      console.log('error: ', e.toLocaleString());
    }
  }

  getMyAddress() {
    const node_number = localStorage.getItem('node_number');
    this.keyService.get_key_node(node_number)
      .then(data => {
        this.keyList = data;
        console.log('set node_number(node_number: string) Key : ', this.keyList);
        if (this.keyList.length > 0) {
          this.from = this.keyList[0].address;
          this.private_key = this.keyList[0].private_key;
          this.public_key = this.keyList[0].public_key;
          this.keyPair = bitcoin.ECPair.fromWIF(this.keyList[0].wif, bitcoin.networks.bitcoin);
        }
        if (this.keyList.length > 1) {
          this.to = this.keyList[1].address;
        }
      });
  }

  public_key_from_private_key(): bitcoin.ECPair {
    // http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
    // https://github.com/cryptocoinjs/secp256k1-node

    const pubKey = secp256k1.publicKeyCreate(Buffer.from(this.private_key, 'hex'));

    const keyPairFromPrivateKey = new bitcoin.ECPair(bigi.fromBuffer(Buffer.from(this.private_key, 'hex')), null,
      {compressed: true, network: bitcoin.networks.bitcoin});

    console.log('this.private_key : ', this.private_key);
    console.log('this.public_key : ', this.public_key);

    console.log('created pubKey : ', bigi.fromBuffer(pubKey).toHex());

    console.log('keypair.privKey : ', keyPairFromPrivateKey.d.toHex());
    console.log('keypair.pubKey : ', bigi.fromBuffer(keyPairFromPrivateKey.getPublicKeyBuffer()).toHex());

    return keyPairFromPrivateKey;
  }

  clearForm() {

  }
}
