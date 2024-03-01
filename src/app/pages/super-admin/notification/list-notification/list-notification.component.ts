import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  url: string = config.notification.list;
  num: number = 1;
  public statusnum: any;
  columns: any = [
    {
      title: 'Notification Content',
      data: 'content'
    },
    // {
    //   title: 'Notification Content',
    //   data: 'content'
    // },
    {
      title: "Date",
      data: 'dateadded',
      pipe: 'date'
    },
    {
      title: "Status",
      data: 'id',
      pipe: function (obj: any) {
        let html = `
        <div class="input_wrapper">
        <input type="checkbox" (click)="showRefundModel" class="switch_4" `;
        html += obj.status == 1? 'checked="checked"':'';
        html += `>
        <svg class="is_checked" viewBox="0 0 426.67 426.67">
            <path
                d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z" />
        </svg>
        <svg class="is_unchecked" viewBox="0 0 212.982 212.982">
            <path
                d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z"
                fill-rule="evenodd" clip-rule="evenodd" />
        </svg>
    </div>
        `
        return html;

        // if (obj.status == '1') {
        //   return "<a (click)='showRefundModel' class='btn btn-sm btn-success'>Active</a>";
        // } else {
        //   return "<a (click)='showRefundModel' class='btn btn-sm btn-primary'>Deactive</a>";
        // }
      }
    },

    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a routerLink='/notification/update/" + obj.id + "' class='btn btn-sm btn-primary'>Edit</a>";
      }
    }
  ];

  constructor(private auth: ApiService,
    private route: Router,) { }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
   //console.log(data)  
    //  if(data.usertype == 5 || data.usertype == 3) {
      if(data.usertype !=0) {
      this.route.navigate(['dashboard']);
      // localStorage.removeItem('LoginDetails');
    }
  }

  filter() {
    let search: any = {};
    this.dt.filter(search)
  }

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showRefundModel":
        var values = obj.value;
        var status = '';
        if (values.status == '1') {
          status = 'Deactive';
        } else {
          status = 'Active';
        }
        Swal.fire({
          title: 'Are you sure?',
          text: "Are you sure you want to " + status + " this notification!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Confirm',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            let stno: number;
            if (values.status == 1) {
              this.statusnum = 0;
            } else {
              this.statusnum = 1;
            }
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('id', values.id);
            formdata.append('status', this.statusnum);
            this.auth.postdata(formdata, config.notification.toggle).subscribe((res: any) => {
              if (res.statuscode == 200) {
                Swal.fire({
                  title: res.message,
                  icon: 'success'
                });
                this.filter();
              } else {
                Swal.fire({
                  title: res.message,
                  icon: 'error'
                });
              }
            });

          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              'Cancelled',
              'Transaction Cancelled',
              'error'
            )
          }
        })


        break;
    }
  }


}
