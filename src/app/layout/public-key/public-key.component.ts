import { Component, OnInit } from '@angular/core';
import * as bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import {ECPair} from 'bitcoinjs-lib';
import * as rsa from 'node-rsa';
import {_catch} from 'rxjs/operator/catch';

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
  inputValue = '안녕하세요?';
  encryptedOutput = '';
  decryptedOutput = '';
  rsaKeyPair;
  alertMessage;

  constructor() {
  }

  ngOnInit() {
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
    }

    // const hash = bitcoin.crypto.sha256(Buffer.from(String(Math.floor(Math.random() * 100000)), 'utf-8'));
    // const x = bigi.fromBuffer(hash);
    //
    // this.keyPair = new bitcoin.ECPair(x);
    // this.privatekeyValue = this.keyPair.d.toHex();
    // this.publickeyValue = bigi.fromBuffer(this.keyPair.getPublicKeyBuffer()).toHex();
    // // this.keyValue1 = keyPair.toWIF();
  }

  signMessage() {
    try {
      const encrypted = this.rsaKeyPair.encrypt(this.inputValue, 'base64');
      this.encryptedOutput = encrypted;    // setMaxDigits(38);
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.encryptedOutput = '';
    }
    this.decryptedOutput = '';

    // const ciphertext = rsa.encryptedString(key, this.inputValue);
    // const json_string: string = JSON.stringify(ciphertext);
    // this.encryptedOutput = json_string;

    // const hash = bitcoin.crypto.sha256(Buffer.from(this.inputValue, 'utf-8'));
    // const signature = this.keyPair.sign(hash);
    // this.encryptedOutput = bigi.fromBuffer(signature.toDER()).toHex();
  }

  verifySignature() {
    try {
      const decrypted = this.rsaKeyPair.decrypt(Buffer.from(this.encryptedOutput, 'base64'), 'utf-8');
      this.decryptedOutput = decrypted;
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.decryptedOutput = '';
    }

    // const hash = bitcoin.crypto.sha256(Buffer.from(this.inputValue, 'utf-8'));
    // const signature = bitcoin.ECSignature.fromDER(Buffer.from(this.encryptedOutput, 'hex'));
    // this.decryptedOutput = this.keyPair.verify(hash, signature).toString();
    // console.log('verify=', this.keyPair.verify(hash, signature));

    // var hassh = bitcoin.Buffer.from(this.messageHashToVerify, 'hex');
    // var signatures = bitcoin.ECSignature.fromDER(bitcoin.Buffer.from(this.signatureToVerify, 'hex'));
    // this.signatureValid = this.keyPair.verify(hash, signature);
  }

  encPrivate() {
    try {
      const encrypted = this.rsaKeyPair.encryptPrivate(this.inputValue, 'base64');
      this.encryptedOutput = encrypted;    // setMaxDigits(38);
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.encryptedOutput = '';
    }
    this.decryptedOutput = '';
  }

  decPublic() {
    try {
      const decrypted = this.rsaKeyPair.decryptPublic(Buffer.from(this.encryptedOutput, 'base64'), 'utf-8');
      this.decryptedOutput = decrypted;
    } catch (e) {
      console.log('error:', e.toLocaleString());
      this.decryptedOutput = '';
    }
  }

  clearText() {
    this.rsaKeyPair = null;
    this.privatekeyValue = '';
    this.publickeyValue = '';
    this.inputValue = '';
    this.encryptedOutput = '';
    this.decryptedOutput = '';
  }



}


/****
import {config} from "../app.config";
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

export class RsaService {
  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    this.privateKey = config.authentication.rsa.privateKey;
    this.publicKey = config.authentication.rsa.publicKey;
    this.enabled = config.authentication.rsa.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled)
      return plaintext;

    let buffer = new Buffer(plaintext);
    let encrypted = crypto.privateEncrypt(this.privateKey, buffer);

    return encrypted.toString('base64');
  }

  decrypt(cypher: string): string {
    if (!this.enabled)
      return cypher;

    let buffer = Buffer.from(cypher, 'base64');
    let plaintext = crypto.publicDecrypt(this.publicKey, buffer);

    return plaintext.toString('utf8')
  }
}
***********/
