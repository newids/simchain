import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Transaction} from '../transaction/transaction.interface';
import {Key} from '../../interface/key.interface';
import {Block} from '../mining/block.interface';

@Component({
  selector: 'app-pop-user',
  templateUrl: './pop-user.component.html',
  styleUrls: ['./pop-user.component.css']
})
export class PopUserComponent implements OnChanges {
  closeResult: string;
  private _node_number: string;
  email: string;
  transaction: Transaction;
  key: Key;

  @Input()
  set node_number(node_number: string) {
    this._node_number = (node_number && node_number.trim()) || '<no node_number set>';
    this.email = localStorage.getItem('email');
  }

  get node_number(): string {
    return this._node_number;
  }

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.key = new Key({
      _id: '0',
    });

    this.transaction = new Transaction({
      _id: '0',
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'lg', backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnChanges(changes: { [node_number: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      this._node_number = JSON.stringify(changedProp.currentValue).toString();


      console.log('this._node_number:', this._node_number);
      console.log('this.email:', this.email);
    }
    // for (let propName in changes) {
    //   let changedProp = changes[propName];
    //   let to = JSON.stringify(changedProp.currentValue);
    //   if (changedProp.isFirstChange()) {
    //     log.push(`Initial value of ${propName} set to ${to}`);
    //   } else {
    //     let from = JSON.stringify(changedProp.previousValue);
    //     log.push(`${propName} changed from ${from} to ${to}`);
    //   }
    //   this.changeLog.push(log.join(', '));
    // }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
