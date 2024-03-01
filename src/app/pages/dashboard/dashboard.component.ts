import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexResponsive,
  ApexNoData,
  ApexGrid,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { DatePipe } from '@angular/common';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
export type BusinesschartExport = {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  labels: string[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  responsive: ApexResponsive[];
  noData: ApexNoData;

}
export type Product_wise_volume_share = {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  labels: string[];
  responsive: ApexResponsive[];
}
export type ActiveuserExport = {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  series: ApexAxisChartSeries;
  grid: ApexGrid;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {
  slidesStore: any = [];
  //slidesStore=[{src:'assets/img/slider-1.png'}]

  sliderOptions: OwlOptions = {
    autoplay: false ,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    // margin: 10,
    // autoWidth: true,
    loop: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    // navText: ['', ''],
    nav: false,
    // responsiveRefreshRate: 500,
    responsive: {
      0: {
        items: 1,

      },
    }

  }

  @ViewChild('rangePicker') rangePicker: any;
  bsCustConfg = CustConfg;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  content: any;
  customOptions: OwlOptions = {
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    loop: true,
    pullDrag: false,
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }
  product_wise_status: any;
  ptotal: any;
  bussinessstaus: any;
  slides: any = [];
  dateType = "TODAY";
  findType = "DMT";
  dmt: any;
  aeps: any;
  matm: any
  @ViewChild("chart") chart?: ChartComponent;
  public product_wise_volume_share: Product_wise_volume_share;
  public businesschart: BusinesschartExport;
  public activeuser: ActiveuserExport;
  usertype: any;
  userType: any;
  maxDate!: Date;
  search: any;
  enddate: any;
  startdate: any;
  amount:any;

  constructor(
    private route: Router,
    private auth: ApiService,
    private _UserLoginDtlService: UserLoginDtlService,
    private datePipe: DatePipe

  ) {


    this._UserLoginDtlService.geterUserLoginDtl.subscribe((val: any) => {
      if (val) {
        this.userType = val.usertype;
      }
    })

    // if(this.userType !=1){
    this.product_wise_volume_share = {
      chart: {
        type: 'donut',
        width: 480,
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 10,
          height: 10,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 10
        }
      },

      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '29px',
                fontFamily: 'Nunito, sans-serif',
                color: undefined,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '26px',
                fontFamily: 'Nunito, sans-serif',
                color: '20',
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                color: '#888ea8',
                // formatter: function (w) {
                //   //return this.ptotal;
                //   return w.globals.seriesTotals.reduce(function (a: any, b: any) {

                //     return a+b;
                //    // return getLocaleNumberFormat('en-US',(a + b).CurrencyDecimal); 
                //   }, 0)
                // }
              }
            }
          }
        }
      },
      stroke: {
        show: true,
        width: 10,
      },
      labels: ['No Records'],
      series: [0],
      responsive: [{
        breakpoint: 1599,
        options: {
          chart: {
            width: '300px',
            height: '450px'
          },
          legend: {
            position: 'bottom'
          },
        },
      }]


    }
    this.businesschart = {
      chart: {
        fontFamily: 'Nunito, sans-serif',
        height: 365,
        type: 'area',
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        },
        toolbar: {
          show: false
        },
        // events: {
        //   mounted: function (ctx, config) {
        //     const highest1 = ctx.getHighestValueInSeries(0);
        //     const highest2 = ctx.getHighestValueInSeries(1);

        //     ctx.addPointAnnotation({
        //       x: new Date(ctx.w.globals.seriesX[0][ctx.w.globals.series[0].indexOf(highest1)]).getTime(),
        //       y: highest1,
        //       label: {
        //         style: {
        //           cssClass: 'd-none'
        //         }
        //       },
        //       customSVG: {
        //         SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#1b55e2" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
        //         cssClass: undefined,
        //         offsetX: -8,
        //         offsetY: 5
        //       }
        //     })

        //     // ctx.addPointAnnotation({
        //     //   x2: new Date(ctx.w.globals.seriesX[1][ctx.w.globals.series[1].indexOf(highest2)]).getTime(),
        //     //   y2: highest2,
        //     //   label: {
        //     //     style: {
        //     //       cssClass: 'd-none'
        //     //     }
        //     //   },
        //     //   customSVG: {
        //     //     SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#42ebb1" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
        //     //     cssClass: undefined,
        //     //     offsetX: -8,
        //     //     offsetY: 5
        //     //   }
        //     // })
        //   },
        // }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square'
      },
      series: [0],
      labels: ['No Data'],
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: true
        },
        labels: {
          offsetX: 0,
          offsetY: 5,
          style: {
            fontSize: '12px',
            fontFamily: 'Nunito, sans-serif',
            cssClass: 'apexcharts-xaxis-title',
          },
        }
      },
      // yaxis: {
      //   labels: {
      //     formatter: function (value, index) {
      //       return (value / 1000) + 'K'
      //     },
      //     offsetX: -22,
      //     offsetY: 0,
      //     style: {
      //       fontSize: '12px',
      //       fontFamily: 'Nunito, sans-serif',
      //       cssClass: 'apexcharts-yaxis-title',
      //     },
      //   }
      // },
      yaxis: [
        {
          labels: {
            formatter: function (value, index) {
              return (value / 1000) + 'K'
            },
            offsetX: -22,
            offsetY: 0,
            style: {
              fontSize: '12px',
              fontFamily: 'Nunito, sans-serif',
              cssClass: 'apexcharts-yaxis-title',
            },
          }
        },
        {
          opposite: true,
          labels: {
            formatter: function (value, index) {
              return (value / 1000) + 'K'
            },
            offsetX: -22,
            offsetY: 0,
            style: {
              fontSize: '12px',
              fontFamily: 'Nunito, sans-serif',
              cssClass: 'apexcharts-yaxis-title',
            },
          }
        }
      ],
      grid: {
        borderColor: '#e0e6ed',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false,
          }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: -10
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -50,
        fontSize: '16px',
        fontFamily: 'Nunito, sans-serif',
        markers: {
          width: 10,
          height: 10,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 0,
          vertical: 20
        }
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: false,
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: .28,
          opacityTo: .05,
          stops: [45, 100]
        }
      },
      noData: {
        text: undefined,
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
      },
      responsive: [{
        breakpoint: 575,
        options: {
          legend: {
            offsetY: -30,
          },
        },
      }]
    };
    this.activeuser = {
      chart: {
        height: 140,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [{ data: [] }],
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'top',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: false,
        }
      },
      fill: {
        colors: ['#f91e2f', '#c9dcea'],
        opacity: 1
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: '',
      },
      yaxis: {
        show: false
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false
          }
        },
        padding: {
          top: 10,
          right: 0,
          bottom: -40,
          left: 0
        },
      },
    }
    //}

    //console.log(this.userType);
  }
  ngAfterViewInit() {
  }
  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getNotification();
    this.getbannerdata();
    
    if (typeof (localStorage.getItem('LoginDetails')) !== 'undefined' && localStorage.getItem('LoginDetails') !== '') {
      let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      let data: any = JSON.parse(decode);
      this.usertype = data.usertype;
    } else {
      this.route.navigate(['login']);
    }

    this.getuserdata();
    this.getMtd_lmtd();
    // this.getFunding();
    if (this.userType != 1) {
      this.product_share();
      this.businessdata();
      this.getNotification();
      // this.getbannerdata();
    }
    if (this.userType == 1) {
      this.getFunding();
    }
  }
  // getNotification(){
  //   const formdata = new FormData();
  //   formdata.append('token', config.tokenauth);
  //   formdata.append('status', '1');
  //   this.auth.postdata(formdata, config.notification.active).subscribe((res: any) => {
  //     if (res.statuscode == 200) {
  //       this.content = res.data.content;
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: res.message
  //       });
  //     }
  //   });
  // }
  getMtd_lmtd() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', this.startdate);
    formdata.append('enddate', this.enddate);
    this.auth.postdata(formdata, config.mtd_lmtd).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.slides = res.data;
        //console.log(this.slides);

      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  getuserdata() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.getsingleuser).subscribe((res: any) => {
      if (res.data.is_kyc == 0) {
        if (this.usertype != 0) {
          this.route.navigate(['kyc-upload-documents']);
        }
      }
    })
  }
  onselecttrend() {
    const bformdata = new FormData();
    bformdata.append('token', config.tokenauth);
    bformdata.append('date', this.dateType);
    bformdata.append('product', this.findType);
    this.auth.postdata(bformdata, config.business_trend)
      .subscribe((res: any) => {
        this.businesschart.labels = res.data.labels;
        this.businesschart.series = res.data.series;
        this.bussinessstaus = res.data.series[0].data;
      })

  }
  product_share() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.product_wise_volume_share).subscribe((res: any) => {
      //console.log(res.data);
      this.product_wise_volume_share.labels = res.data.label;
      this.product_wise_volume_share.series = res.data.series;
      this.product_wise_status = res.data.series;
      this.ptotal = res.data.total;
    })
  }
  businessdata() {
    const bformdata = new FormData();
    bformdata.append('token', config.tokenauth);
    bformdata.append('product', 'DMT');
    bformdata.append('date', 'TODAY');
    this.auth.postdata(bformdata, config.business_trend)
      .subscribe((res: any) => {
        this.businesschart.labels = res.data.labels;
        this.businesschart.series = res.data.series;
        this.bussinessstaus = res.data.series[0].data;
        //console.log(res.data.series[0].data);
      })
  }
  activerUserFn(obj: any) {
    this.activeuser = {
      chart: {
        height: 140,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: obj.data,
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'top',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: false,
        }
      },
      fill: {
        colors: ['#f91e2f', '#c9dcea'],
        opacity: 1
      },

      xaxis: {
        labels: {
          show: false,
        },
        categories: '',
      },
      yaxis: {
        show: false
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false
          }
        },
        padding: {
          top: 10,
          right: 0,
          bottom: -40,
          left: 0
        },
      },

    }
  }
  getNotification() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.notification.get).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.content = res.data;
        // content1 = content1.filter((res: any) => res.status == '1');
        // this.content = content1[0].content;
      }
    });
  }
  filter() {
    this.startdate = this.datePipe.transform(this.search[0], 'dd-MM-yyyy');
    this.enddate = this.datePipe.transform(this.search[1], 'dd-MM-yyyy');

    // console.log(this.startdate, this.enddate )
    // this.dates = value;
    this.getMtd_lmtd();
  }

  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  getbannerdata() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.banner.list).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.slidesStore = res.data.map((o: any) => o.banner_name);
        console.log(this.slidesStore);
      }
    })
  }

  getFunding() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.fund.lisitngAdmin).subscribe((res: any) => {
      
      if (res.statuscode == 200) {
        console.log(res.data)
        let arr = [];
      for (var v of res.data) {
        arr.push({ status: v.status, amount: v.amount });
       
        // console.log(v.amount)
        // console.log(v.status)
        // this.amount = v.amount
       this.amount = arr;
      
      }
      }
    });
  }
}
