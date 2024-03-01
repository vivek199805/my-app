import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'

@Component({
  selector: 'app-complaint-chat',
  templateUrl: './complaint-chat.component.html',
  styleUrls: ['./complaint-chat.component.css']
})
export class ComplaintChatComponent implements OnInit {
  form: any = FormGroup;
  form1: any = FormGroup;
  private chatId: any = '';
  public chatDetail: any = [];
  chatuserdetails:any =[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private auth: ApiService,
    private fb: FormBuilder,
    private location:Location
    ) {
     
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      chatMessage: ['', [Validators.required]],
    });
    this._activatedRoute.params.subscribe(parameter => {
      this.chatId = parameter.id;
    })
    this.getChatMessages();

    var chatUserList = [];
    const formdata = new FormData();
   formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata ,config.complaint.list).subscribe((res:any)=>{
      if (res.statuscode == 200) {
         chatUserList = res.data;
        var foundIndex = chatUserList.findIndex((res:any)=>res.ticket_no === this.chatId)
      //console.log(chatUserList[foundIndex]);
        this.chatuserdetails.push(chatUserList[foundIndex])
      }
    })
  }

  getChatMessages(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('ticket_no_solution',this.chatId)
    this.auth.postdata1(formdata, config.complaint.chat).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.chatDetail = res.data;
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }

  addchatMessage(){
    const formdata = new FormData(); 
    formdata.append('token', config.tokenauth);
    formdata.append('ticket_no_solution',this.chatId);
    formdata.append('message',this.form.get('chatMessage').value)
    this.auth.postdata1(formdata, config.complaint.message).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.getChatMessages();
        this.form.reset();
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  addcloseMessage(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('closed','1' );
    formdata.append('ticket_no_solution',this.chatId);
    formdata.append('message',this.form.get('chatMessage').value)
    this.auth.postdata1(formdata, config.complaint.message).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.getChatMessages();
        this.form.reset();
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }


  Back(){
this.location.back();
  }

}
