import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-kyc-user-list',
  templateUrl: './kyc-user-list.component.html',
  styleUrls: ['./kyc-user-list.component.css']
})
export class KycUserListComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  minDate!: Date; 
  remarks: any;
  modelObj: any = [];
  @ViewChild('rangePicker') rangePicker: any;
  url: string = config.kyc.list;
  kycform: any = FormGroup;
  form: any =FormGroup;
  bsCustConfg = CustConfg;
  docid: any;
  userType:any;
  status: any = '';
  panImage: any;
  aadhar_front: any;
  aadhar_back: any;
  changest: boolean = false;
  rejectedDoc: boolean = false;
  capId:any;
  details: any
  originalOrder = (): number => {
    return 0;
  }

  columns: any = [
    {
      title: 'ID',
      data: 'id'
    },
    {
      title: 'Username',
      data: 'username'
    },
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: "Firm Name",
      data: 'firmname'
    },
    {
      title: "Email ID",
      data: 'email'
    },
    {
      title: "Date Of Birth",
      data: 'dob',
      pipe: "date"
    },
    {
      title: "Phone No.",
      data: 'phone'
    },
    {
      title: "Pan Number",
      data: 'pannumber'
    },
    {
      title: "Uploaded Document",
      data: 'panimage',
      pipe: function (obj: any) {
        return "<a (click)='uploadeDoc' data-toggle='modal' data-target='#uploadeDoc' class='btn btn-primary'>View</a>";
      }
    },
    {
      title: 'Approver',
      data: 'approver'
    },
    {
      title: 'Status',
      data: 'status'
    },
    {
      title: 'Address',
      data: 'address'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        if (obj.status == 'Approved') {
          return "-";
        } else {
          return "<a (click)='showStatusModel' class='btn btn-primary'>Action</a>";
        }
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='debitBalance' data-toggle='modal' data-target='#exampleModal' class='btn btn-primary'>See Upper Network</a>";
      }
    }
  ];

  constructor(
    private datepipe: DatePipe,
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.kycform = this.fb.group({
      remarks: ['', [Validators.required]],
      status: ['', [Validators.required]],
      rejectDoctype: [''],
    });

    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]),
      status: new FormControl (['', [Validators.required]]),
    })

  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.kycform.valueChanges.subscribe((x: any) => {
    //console.log(x)
      this.rejectedDoc = x.status == '2' ? true : false;
      if (this.rejectedDoc) {
        this.kycform.controls["rejectDoctype"].setValidators(Validators.required);
      } else {
        this.kycform.controls['rejectDoctype'].clearValidators()
      }

    })
  }

  filter() {
    let search: any = {};  
    
    
    search.status = this.form.get('status').value
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    
    this.dt.filter(search)
  }


  onDateRangePickerShow() {
    // This is a workaround to show previous month
    let search: any = {};
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  listing() {
    let search: any = {};
    this.dt.filter(search)
  }

  funObj(obj: any) {
    let details: any = {};
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showStatusModel":
        this.docid = value.doc_id;
        this.remarks = value.remarks;
      //console.log(value.remarks);
        $("#kycStatusModel").modal('show');
        break;
      case "uploadeDoc":
        this.panImage = value.panimage;
        this.aadhar_back = value.back_image;
        this.aadhar_front = value.front_image;
        break;
        case "debitBalance":
          this.capId = value.id;
        console.log(value.usertype)
        switch (value.usertype){
            case "5":
              details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
              details["SD Name"] = [value.superusername+"   ("+value.superphone+")"],
              details["Partner Name"] = [value.partnerusername +"   ("+value.partnerphone+")"],
              details["Distributor Name"] = [value.distusername+"    ("+value.distphone+")"];
              this.details = details; 
              // console.log("details ", details );
              break;

              case "4":
                details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
                details["SD Name"] = [value.superusername+"   ("+value.superphone+")"],
                details["Partner Name"] = [value.partnerusername +"   ("+value.partnerphone+")"],
                this.details = details; 
                // console.log("details ", details );
                break;
                case "3":
                  details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
                  details["SD Name"] = [value.superusername+"   ("+value.superphone+")"],
                  this.details = details; 
                  // console.log("details ", details );
                  break;
                  case "2":
                    details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
                    this.details = details; 
                    // console.log("details ", details );
                    break;
                    default: 
        }   
        break;  
        default: 
    }
       
  }

  stmodalClose() {
    this.changest = false;
  }

  kycForm() {
    if (!this.kycform.valid) {
      return;
    } else {
      let sta = '';
      if (this.kycform.get('status').value == '1') {
        sta = 'Approved';
      }
      if (this.kycform.get('status').value == '2') {
        sta = 'Rejected';
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to " + sta + " this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('doc_id', this.docid);
          formdata.append('status', this.kycform.get('status').value);
          formdata.append('remarks', this.kycform.get('remarks').value);
          formdata.append('reject_type', this.kycform.get('rejectDoctype').value);        
          this.auth.postdata(formdata, config.kyc.status).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              $("#kycStatusModel").modal('hide');
              this.kycform.reset();
              this.listing();
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

    }
  }

  get f() { return this.kycform.controls; }


}
