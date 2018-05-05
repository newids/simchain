import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {WordArray} from 'crypto-js';

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent implements OnInit {
  textValue = '';
  outputValue = '';
  textValue2 = '';
  outputValue2 = '';

  constructor() { }

  ngOnInit() {
  }

  hash() {
    let msg: WordArray;
    msg = CryptoJS.SHA256(this.textValue);
    this.outputValue = msg.toString();
    console.log('outputValue=', this.outputValue);
  }

  hash2() {
    let msg: WordArray;
    msg = CryptoJS.SHA256(this.textValue2);
    this.outputValue2 = msg.toString();
    console.log('outputValue=', this.outputValue2);
  }

  copied() {
    // TODO: copied...
    console.log('copied to clipboard.');
  }

}
