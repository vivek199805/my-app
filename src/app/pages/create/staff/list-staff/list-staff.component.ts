import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {
  url: string = config.account.staff.list; 
  
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
        return "<a routerLink='/account/staff/update/"+obj.id+"' class='btn btn-primary'>Edit</a>";
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
