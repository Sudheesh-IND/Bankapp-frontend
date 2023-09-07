import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

   acno:any//for parent child data communication
   deleteConfirmStatus:boolean=false

     isCollapse:boolean=false
     currentUser:string=''
     currentBalance:string=''
     currentAcno: string='';
     token: string=''
     transferSuccess:string=''
     transferError:string=''
     isInsideDashboard:boolean=true
     isLoggingOut:boolean=false
     deleteSuccessMsg:String=''
  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}
  ngOnInit(): void {
     if(localStorage.getItem('currentUser')){
      this.currentUser=localStorage.getItem('currentUser')||''
  
     }
     if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||''
    
     }
     if(localStorage.getItem('token')){
      this.token=localStorage.getItem('token')||''
    
     }

     if(!localStorage.getItem('token')){
      alert('Please login')
      this.route.navigateByUrl('/')
     }
  }

  fundTransferDetails=this.fb.group({
       creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
       amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
       password:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })

    //function for collapse
     collapse(){
      this.isCollapse=!this.isCollapse //taking the negation of is collapse so that true and false come alternatively
     }
    //for account transfer
     fundTransfer(){
      console.log(this.fundTransferDetails.value)
      if(this.fundTransferDetails.valid){
        let password=this.fundTransferDetails.value.password
        let creditAcno=this.fundTransferDetails.value.creditAcno
        let amount=this.fundTransferDetails.value.amount

        this.api.fundTransfer(password,creditAcno,amount).subscribe((response:any)=>{
          console.log(response)
          this.transferSuccess=response.message

            //giving set timeout for automatic reset
          setTimeout(() => {
            this.fundTransferDetails.reset()
            this.transferSuccess=''
          }, 2000);
        },(response:any)=>{
             this.transferError=response.error.message

             //giving set timeout for automatic reset
             setTimeout(() => {
              this.fundTransferDetails.reset()
              this.transferError=''
            }, 2000);
        })
        // alert('Data accepted')
      }else{
        alert('Data not accepted')
      }
          
     }

    getBalance(){
      this.api.getBalance(this.currentAcno).subscribe((response:any)=>{
        console.log(response)
        this.currentBalance=response.balance
        
      },(response:any)=>{
        alert(response.error.message)
      })
    }
    resetForm(){
      this.fundTransferDetails.reset()
    }

    //logout
    logOut(){
      this.isInsideDashboard=false
      this.isLoggingOut=true
      localStorage.clear()
      setTimeout(() => {
        this.route.navigateByUrl('/')
      }, 2000);
    }

    //data transfer during remove account
    deleteAccount(){
      this.acno=localStorage.getItem('currentAcno')
      this.deleteConfirmStatus=true
    }

    //cancel delete process

    cancelDeleteConfirm(){
      this.acno=''
      this.deleteConfirmStatus=false
    }

    //deleting the account
    deleteFromParent(){
      this.api.deleteAccount().subscribe((response:any)=>{
        localStorage.clear()
        this.deleteSuccessMsg=response.message
        setTimeout(() => {
          this.route.navigateByUrl('/') //reedirected to login page

        }, 3000);
      })
    }
   
}
