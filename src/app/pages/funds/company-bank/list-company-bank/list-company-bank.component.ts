import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config'; 

@Component({
  selector: 'app-list-company-bank',
  templateUrl: './list-company-bank.component.html',
  styleUrls: ['./list-company-bank.component.css']
})
export class ListCompanyBankComponent implements OnInit {
  url: string = config.companybank.list; 
  
  columns: any = [ 
    {
      title: 'Bank Name',
      data: 'name'
    },
    {
      title: 'Account Number',
      data: 'accno'
    },
    {
      title: 'IFSC Code',
      data: 'ifsc'
    },
    {
      title: 'Branch Name',
      data: 'branch'
    },
    {
      title: 'Balance',
      data: 'balance'
    },
    {
      title: "Date",
      data: 'added',
      pipe:'date'
    },
    {
      title: "Status",
      data: 'status', 
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj:any) {
        return "<a routerLink='/update-company-bank/"+obj.id+"' class='btn btn-primary'>Edit</a>";
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
