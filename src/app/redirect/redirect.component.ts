import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  private refId : string = '';
  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.refId = params['referenceid'];
      localStorage.setItem("Gatewaypg",this.refId);
    });
    this.redirect();
  }

  redirect(){
    this.router.navigate(['/pg-recepit']);
  }
}
