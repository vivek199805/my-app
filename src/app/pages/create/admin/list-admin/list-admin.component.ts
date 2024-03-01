import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config'; 

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  url: string = config.account.admin.list; 
  
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
      title: 'CD Balance',
      data: 'cd_balance'
    },
    {
      title: 'Phone no',
      data: 'phone'
    },
    {
      title: 'Firm name',
      data: 'firmname'
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
        return "<a routerLink='/account/admin/update/"+obj.id+"' class='btn btn-primary'>Edit</a>";
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
