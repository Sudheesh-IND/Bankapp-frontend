import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  searchTerm:String=''
  transactions:any={}
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.transactionHistory().subscribe((response:any)=>{
           this.transactions=response.transactions
           console.log(this.transactions)
           console.log(response)
    },(response:any)=>{
      console.log(response.error.message)
    })
  }

  //function to generate pdf
  generatePdf(){
    //create object for json pdf
    var pdf=new jspdf()

    //2setup row for the table
    let thead=['Amount','From Account','To Account','type']
    let tbody=[]

    //setting propertires of table
    pdf.setFontSize(10)
    pdf.text('mini statements',15,16)

    //setting data into an aray using forloop
    for(let item of this.transactions){
      let temp=[item.amount,item.fromAcno,item.toAcno,item.type]
      tbody.push(temp)
    }

    //convert nested array into table structure using jspdf autotable
     (pdf as any).autoTable(thead,tbody)

     //open pdf in another tab
     pdf.output('dataurlnewwindow')

     //download or save pdf
     pdf.save('TransactionHistory.pdf')
  }

 

}
