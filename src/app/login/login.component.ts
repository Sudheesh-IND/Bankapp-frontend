import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginSuccess:string=''
  LoginError:string=''
   constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}
  ngOnInit(): void {
    
  }

   loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
   })
   
   login(){
    if(this.loginForm.valid){
      
      console.log(this.loginForm)
      let acno=this.loginForm.value.acno
      let password=this.loginForm.value.password
      this.api.login(acno,password).subscribe((response:any)=>{
        console.log(response)
        alert(response.message)
        this.LoginSuccess=response.message

        //sertting username into local storage
        window.localStorage.setItem('currentUser',response.currentUser)
        window.localStorage.setItem('currentBalance',response.currentBalance)
        window.localStorage.setItem('currentAcno',response.currentAcno)
        window.localStorage.setItem('token',response.token)

        setTimeout(() => {
          this.route.navigateByUrl('/dashboard')
        }, 2000);
        
      },
      (response:any)=>{
        this.LoginError=response.error.message
        setTimeout(() => {
          this.loginForm.reset()
          this.LoginError=''
          
        }, 2000);
      }
      )
    }else{
      alert('Invalid details')
    }
    
   }

}
