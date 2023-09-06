import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';


const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'dashboard',component: DashboardComponent
  },
  {
    path:'transaction',component:TransactionComponent 
  },
 
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
