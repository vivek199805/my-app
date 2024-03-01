import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public isActive:boolean = false;
  constructor(private loader: LoaderService) {
    this.loader.isLoading.subscribe((v) => { 
      this.isActive = v;
    });
  }

  ngOnInit(): void {
    
  }

}
