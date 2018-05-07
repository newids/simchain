import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'main'},
      {path: 'main', loadChildren: './main/main.module#MainModule'},
      {path: 'hash', loadChildren: './hash/hash.module#HashModule'},
      {path: 'symmetric-key', loadChildren: './symmetric-key/symmetric-key.module#SymmetricKeyModule'},
      {path: 'public-key', loadChildren: './public-key/public-key.module#PublicKeyModule'},
      {path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule'},
      {path: 'transaction', loadChildren: './transaction/transaction.module#TransactionModule'},
      {path: 'mining', loadChildren: './mining/mining.module#MiningModule'},
      {path: 'blockchain-info', loadChildren: './blockchain-info/blockchain-info.module#BlockchainInfoModule'},
      {path: 'hacking', loadChildren: './hacking/hacking.module#HackingModule'},
      {path: 'ethereum', loadChildren: './ethereum/ethereum.module#EthereumModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
