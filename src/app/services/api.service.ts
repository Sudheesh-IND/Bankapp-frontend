import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //register
  register(username:any,acno:any,password:any){
    const body={
      username,
      acno,
      password
    }
   return this.http.post('http://localhost:5000/register',body)
  }
  //login
  login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }

  //taking token
  appendtoken(){
    let token=localStorage.getItem('token')
    //creating new httpheader
    let headers=new HttpHeaders()

    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers
    }
    return options
  }

  getBalance(acno:any){
    return this.http.get(`http://localhost:5000/getbalance/`+acno,this.appendtoken())
  }
  fundTransfer(fromPswd:any,toAcno:any,amount:any){
         const body={
          fromPswd,
          toAcno,
          amount
         }
         return this.http.post('http://localhost:5000/fundtransfer',body,this.appendtoken())
  }
  transactionHistory(){
    return this.http.get('http://localhost:5000/transactions',this.appendtoken())
  }

  //delete account
  deleteAccount(){
    return this.http.delete('http://localhost:5000/deleteaccount',this.appendtoken())
  }
}
