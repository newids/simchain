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
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
      {path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
      {path: 'forms', loadChildren: './form/form.module#FormModule'},
      {path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule'},
      {path: 'grid', loadChildren: './grid/grid.module#GridModule'},
      {path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule'},
      {path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
