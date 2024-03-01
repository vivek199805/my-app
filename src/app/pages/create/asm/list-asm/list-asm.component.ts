import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';

@Component({
  selector: 'app-list-asm',
  templateUrl: './list-asm.component.html',
  styleUrls: ['./list-asm.component.css']
})
export class ListAsmComponent implements OnInit {
  url: string = config.account.asm.list; 
  
  columns: any = [ 
    {
      title: 'Username',
      data: 'username'
    },
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: 'Email',
      data: 'email'
    },
    {
      title: 'Pan',
      data: 'pannumber'
    },
    {
      title: 'Balance',
      data: 'balance'
    },
    {
      title: 'PIN Code ',
      data: 'pincode'
    },
    {
      title: 'Phone no',
      data: 'phone'
    },
    {
      title: "Date",
      data: 'addeddate',
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
        return "<a routerLink='/account/asm/update/"+obj.id+"' class='btn btn-primary'>Edit</a>";
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {  
  }

}
