import {Component, OnInit, ViewChild} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {WordArray} from 'crypto-js';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent implements OnInit {
  textValue = '';
  hashedValue = '';
  textValue2 = '';
  hashedValue2 = '';

  @ViewChild('copyTextTooltip') copyTextTooltip: NgbTooltip;
  @ViewChild('copyHashedTooltip') copyHashedTooltip: NgbTooltip;
  @ViewChild('copyTextTooltip2') copyTextTooltip2: NgbTooltip;
  @ViewChild('copyHashedTooltip2') copyHashedTooltip2: NgbTooltip;

  private subject$ = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.tooltip(null);
  }

  hash() {
    let msg: WordArray;
    msg = CryptoJS.SHA256(this.textValue);
    this.hashedValue = msg.toString();
    console.log('hashedValue=', this.hashedValue);
  }

  hash2() {
    let msg: WordArray;
    msg = CryptoJS.SHA256(this.textValue2);
    this.hashedValue2 = msg.toString();
    console.log('hashedValue=', this.hashedValue2);
  }

  copyText() {
    this.tooltip(this.copyTextTooltip);
  }

  copyText2() {
    this.tooltip(this.copyTextTooltip2);
  }

  copyHashed() {
    this.tooltip(this.copyHashedTooltip);
  }

  copyHashed2() {
    this.tooltip(this.copyHashedTooltip2);
  }

  randomText() {
    const textA = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper a quam ac rhoncus. Suspendisse condimentum congue leo vel convallis.';
    const textB = 'Vivamus ac eleifend purus, at vehicula felis. Sed ornare suscipit imperdiet. Maecenas eu eros nibh. Phasellus non imperdiet urna, eget volutpat nisl. Nulla lacinia quam ac mi bibendum, eu sagittis quam tincidunt. Nulla vel congue erat. Aenean pulvinar venenatis pellentesque. Suspendisse tempus augue id vestibulum pretium. Aenean ac semper augue. Vivamus ultrices ante ac pulvinar pellentesque. Ut semper condimentum aliquet.\n Nulla eget velit urna. Phasellus sit amet vulputate erat, vitae volutpat velit. Curabitur at elit porttitor, cursus neque at, pretium lectus. Praesent bibendum ullamcorper nulla a mattis. Suspendisse non facilisis tortor. Nulla facilisi. Morbi porttitor vehicula consequat. In id mattis sapien. Nullam ut augue nunc. Nullam eget odio viverra, tempus felis quis, lobortis ipsum. Aenean sit amet lacus molestie, pretium nisi eget, sodales leo. Fusce luctus ultrices tempor.';
    const r = Math.floor(Math.random() * 10000 + 1);
    const random = String(r);
    const random2 = String(r + 1);

    this.hashedValue = '';
    this.hashedValue2 = '';

    this.textValue = `${textA} +0OIl/ ${random}.\n${textB}`;
    this.textValue2 = `${textA} +O0lI/ ${random2}.\n${textB}`;
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

}
