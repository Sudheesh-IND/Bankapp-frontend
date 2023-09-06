import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
      
  RegisterError:string=''
  Registersuccess=''
  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  registerForm=this.fb.group({  //from group
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],         //from array
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //pass the formcontrol to html file
 register(){
  if(this.registerForm.valid){
    console.log(this.registerForm.value)
    //assign all the values to the form array
    let username=this.registerForm.value.username
    let acno=this.registerForm.value.acno                //all the values from the html file are now placed in the array
    let password=this.registerForm.value.password
    // console.log(username,acno,password)
    this.api.register(username,acno,password).subscribe((response:any)=>{
      console.log(response)
      alert(response.message)
     this.Registersuccess=response.message
      setTimeout(() => {
        this.route.navigateByUrl('/')
      }, 2000);

    },
      (response:any)=>{
       this.RegisterError=response.error.message
      setTimeout(() => {
        this.registerForm.reset()
        this.RegisterError=''
      }, 2000);
      }
    )
  }else{
    alert("Invalid details")
  }

 }

}
