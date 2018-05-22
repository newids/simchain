import {Component, Input, Output, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Key} from '../../interface/key.interface';
import {KeyService} from '../../interface/key.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DetailviewComponent} from '../detailview/detailview.component';
import {TxService} from '../../interface/tx.service';

@Component({
  selector: 'app-pop-user',
  templateUrl: './pop-user.component.html',
  styleUrls: ['./pop-user.component.scss']
})
export class PopUserComponent implements OnInit {
  isSuperUser = null;
  closeResult: string;
  @Input() node_number: string;
  email: string;
  key: Key;
  keyList: Key[];
  columns_key = [];

  @ViewChild('content') content: any;

  // https://ng-bootstrap.github.io/#/components/modal/examples
  @ViewChild(DetailviewComponent) child: DetailviewComponent;

  columns = [
    {prop: 'address'},
    {name: 'amount'}
  ];
  rows = [];

  columns_tx = [
    {name: 'Height', prop: 'height', flexGrow: 1},
    {name: 'From', prop: 'from', flexGrow: 3},
    {name: 'To', prop: 'to', flexGrow: 3},
    {name: 'Amount', prop: 'amount', flexGrow: 1},
    {name: 'Time', prop: 'created_date', flexGrow: 2},
  ];
  rows_tx = [];

  detail_view_title: string;
  detail_view_content: string;

  // https://swimlane.gitbook.io/ngx-datatable/api/column/inputs
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(DatatableComponent) table_tx: DatatableComponent;

  constructor(
    public modalService: NgbModal,
    private keyService: KeyService,
    private txService: TxService
  ) {
  }

  ngOnInit() {
    this.key = new Key({
      _id: '0',
    });
  }

  fetch(cb) {
    this.keyService.get_key_node(this.node_number)
      .then(data => {
        // TODO: data.forEach(element => {
        //   this.columns_key.push(`{ address: ${element.address}, balance:${element.amount} }`);
        cb(data);

        console.log('set node_number(node_number: string) Key : ', this.columns_key);
      });
  }

  // fetch2(cb) {
  //   this.transactionService.get_tr_node(this.node_number)
  //     .then(data => {
  //       // TODO: data.forEach(element => {
  //       //   this.columns_key.push(`{ address: ${element.address}, balance:${element.amount} }`);
  //       cb(data);
  //
  //       console.log('set node_number(node_number: string) Key : ', this.columns_key);
  //     });
  // }

  open(content, node, mail) {
    this.isSuperUser = (node === '0000' ? 'True' : null);
    this.node_number = node;
    this.email = mail;

    this.fetch(data => {
      // cache our list
      this.keyList = [...data];

      // push our inital complete list
      this.rows = data;
    });

    console.log('open(content) 1');
    this.modalService.open(content, {size: 'lg', backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log('open(content) 2');

    try {
      this.rows_tx = [];
      this.txService.get_tx_node(this.node_number)
        .then(tx => {
          this.rows_tx.push(...tx);
          this.rows_tx = [...this.rows_tx];
          console.log('tx: ', tx);
          console.log('this.rows_tx: ', this.rows_tx);
        })
        .catch(error => {
          console.log('error: ', error.toLocaleString());
        });
    } catch (e) {
      console.log('Exception: ', e.toLocaleString());
    }
  }

  private getDismissReason(reason: any): string {
    console.log('getDismissReason');
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.keyList.filter(function (d) {
      return d.address.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilter2(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.keyList.filter(function (d) {
      return d.address.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table_tx.offset = 0;
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log('onActivate(event) : ', event);
      console.log('event.row.address : ', event.row.address);

      this.detail_view_title = 'Wallet Detail';
      this.detail_view_content = `
    address : ${event.row.address}
 public key : ${event.row.public_key}
private key : ${event.row.private_key}
        wif : ${event.row.wif}
    balance : ${event.row.amount}`;

      this.child.open(this.child.content, this.detail_view_title, this.detail_view_content);

    }
  }
}
