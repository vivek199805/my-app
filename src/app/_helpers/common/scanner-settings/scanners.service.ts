import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { LoaderService } from 'src/app/service/loader.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { parseString } from 'xml2js';
declare global {
	interface Window {Respon:any; MyNamespace: any; deviceport: any }
}
@Injectable({
  providedIn: 'root'
})

export class ScannersService {
  isShowSubject$ = new BehaviorSubject<boolean>(false);
  banklist:any=[];
  checkDtrue: boolean = false;
  private biometricDetails: any = {};
	longitute: string = '';
	latitute: string = '';
	selectedItem: any = '';
	showTimer: any;
	device_name: String = ''; 
	port: string = '';
	rdsUrl: String = 'http://127.0.0.1';
  checkLoader: boolean = false;
  constructor(
    private loader: LoaderService
  ) { }

  listClick(newValue: string) {
    this.selectedItem = newValue;
    this.getRdsService(newValue);
  }

  getvalue() {
    return this.isShowSubject$.asObservable();
  }

  capture(afterBioMetric:any = null,afterBioMetric2:any = null) {
    this.loader.isLoading.next(true);
    let that = this;
    if (this.device_name == 'Morpho') {
      var urlStr = this.rdsUrl + ':' + this.port + '/capture';
    } else {
      var urlStr = this.rdsUrl + ':' + this.port + '/rd/capture';
    }

    this.getJSONCapture(urlStr,  (err: any, data: any, currentobj: any) => {
      // let that = this;
      if (err != null) {
      //console.log('Error Response: ' + err);
      }
      else {
        let xml = String(data);
        let biometricData = new Object;
        parseString(xml,  (err: any, result: any) => {
          // console.log(result.PidData.Resp[0].$.errCode+'-1');
          
          if (result.PidData.Resp[0].$.errCode == "0") {
            this.checkLoader = true;
            biometricData = {
              deviceInfo: result.PidData.DeviceInfo[0].$,
              skey: result.PidData.Skey[0],
              hmac: result.PidData.Hmac[0],
              data: result.PidData.Data[0],
              resp: result.PidData.Resp[0]
            }
            
            window.MyNamespace = data;
            if(afterBioMetric != null){ 
              afterBioMetric(data,window.Respon);
              afterBioMetric2(result.PidData.Resp[0].$.errCode);
            }else{
              
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Error while fetching data."
              });
            }
            //currentobj.doBiometric();
          } else {
            this.checkLoader = true;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result.PidData.Resp[0].$.errInfo
            });
                // console.log(result.PidData.Resp[0].$.errCode+'-1');

          }
        });
      }
    });
    // }else{
    //   this.formdevice.controls['checkbox'].setErrors({'incorrect': true});
    // }    
  }
  Loader(){
return this.checkLoader;
  }

  getJSONCapture(url: any, callback: any) {
    let xhr: any;
    if ((<any>window).XMLHttpRequest) {
      try {
        xhr = new XMLHttpRequest();
        xhr.open('CAPTURE', url, true);
        xhr.responseType = 'text';
      } catch (e) {
        xhr = new XMLHttpRequest();
        xhr.open('CAPTURE', url, true);
      }
    } else {
      xhr = new XMLHttpRequest();
      xhr.open('CAPTURE', url, true);
    }
    if (environment.production) {
      if (this.device_name == 'Morpho') {
        var InputXml = '<PidOptions ver="1.0">' + '<Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" wadh="" posh="UNKNOWN" env="P" />' + '<CustOpts><Param name="mantrakey" value="" /></CustOpts>' + '</PidOptions>';
      }
      else {
        var InputXml = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\"  otp=\"\"  env=\"P\" wadh="" />' + '</PidOptions>';
      }
    }
    else {
      if (this.device_name == 'Morpho') {
        var InputXml = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"0\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh="" posh=\"\"/>' + '</PidOptions>';
      } else {
        var InputXml = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\"  env=\"P\" wadh="" />' + '</PidOptions>';
      }
    }

    xhr.currentObj = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          callback(null, xhr.responseText, xhr.currentObj);
        } else {
          callback(status, '', xhr.currentObj);
        }
      }
    };
    xhr.send(InputXml);
  };

  async getRdsService(deviceName: string) {
    if (deviceName == 'Startek') {
      let tempVar = false;
      this.rdsUrl = 'https://127.0.0.1';
       this.checkRdService(11200).then((res: any) => {
      //console.log(res);
        tempVar = true;
        this.isShowSubject$.next(true);
        this.port = res.i.toString();
      }).catch(err => {
      //console.log(err);
      });
      if (tempVar) {
        Swal.fire({
          icon: 'success',
          title: 'RDSERVICE STATUS',
          html: 'RDSERVICE is running on port:' + this.port
        });
      //console.log('RDSERVICE is running on port:' + this.port);
      }
      if(!tempVar){
        Swal.fire({
          icon: 'error',
          title: 'RDSERVICE STATUS',
          html: 'RDSERVICE Not running'
        });
      //console.log('RDSERVICE Not running:');
      }
    } else {
      this.rdsUrl = 'http://127.0.0.1';
      for (let i = 11100; i <= 11120; i++) {
         this.checkRdService(i).then((res: any) => {
        //console.log(res.info);
          if(res.info == 'RD service for Startek FM220 provided by Access Computech'){
            Swal.fire({
              icon: 'error',
              title: 'Driver Issue',
              html: 'You have installed startek driver , If you want to use other driver please uninstall this driver first and then use other driver'
            });
          }else if(res.info == 'Mantra Authentication Vendor Device Manager'){
            if(this.selectedItem == 'Mantra'){
              this.isShowSubject$.next(true);
              this.port = res.i.toString();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Driver Issue',
                html: 'You have installed Mantra driver , If you want to use other driver please uninstall this driver first and then use other driver'
              });
            }
          }else if(res.info == 'Morpho_RD_Service'){
            if(this.selectedItem == 'Morpho'){
              this.isShowSubject$.next(true);
              this.port = res.i.toString();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Driver Issue',
                html: 'You have installed Morpho driver , If you want to use other driver please uninstall this driver first and then use other driver'
              });
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Driver Issue',
              html: 'You have installed Morpho driver , If you want to use other driver please uninstall this driver first and then use other driver'
            });
          }
          // else{
          //   tempVar1 = true;
          //   this.isShowSubject$.next(true);
          //   this.port = res.i.toString();
          // }
        }).catch(err => {
        //console.log(err);
        });
      }
    }
  
  }


  checkRdService(i: any) {
    return new Promise((resolve, reject) => {
      try {
        var urlStr = this.rdsUrl + ':' + i.toString() + '/';
        this.getJSON_rd(urlStr, function (err: any, data: any) {
          parseString(data,  (err: any, result: any) => {
          //console.log(result.RDService.$.status);
            
            if (result.RDService.$.status == 'NOTREADY') {
              Swal.fire({
                icon: 'error',
                title: 'Biometric Device not plugin',
                html: 'RD service is not running on port '+i
              });
              // console.log('Biometric Device Response: ' + err);
              // reject('RD service is not running on port ' + i);
            } else {
              var info = result.RDService.$.info
              Swal.fire({
                icon: 'success',
                title: 'RDSERVICE STATUS',
                html: 'RDSERVICE is running.'
              });
              var body = {
                i:i,
                info:info,
              }
              window.deviceport = i;
              resolve(body);
            }
          })
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getJSON_rd(url: any, callback: any) {
    let xhr: any;
    if ((<any>window).XMLHttpRequest) {
      try {
        xhr = new XMLHttpRequest();
        xhr.open('RDSERVICE', url, true);
        xhr.responseType = 'text';
      } catch (e) {
        xhr = new XMLHttpRequest();
        xhr.open('RDSERVICE', url, true);
      }
    } else {
      xhr = new XMLHttpRequest();
      xhr.open('RDSERVICE', url, true);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          callback(null, xhr.responseText);
        } else {
          callback(status);
        }
      }
    };
    xhr.send();
  };

  async getDeviceInformation() {
    await this.finDeviceInfo().then(response => {
    //console.log(response);
    }).catch(err => {
    //console.log(err);
    })
  }

  finDeviceInfo() {
    return new Promise((resolve, reject) => {
      var urlStr = '';
      if (this.device_name == 'Morpho') {
        urlStr = this.rdsUrl + ':' + this.port + '/getDeviceInfo';
      } else {
        urlStr = this.rdsUrl + ':' + this.port + '/rd/info';
      }
      this.getJSON_info(urlStr, function (err: any, data: any) {
        if (err != null) {
        //console.log('Error Response: ' + err);
          reject(err);
        } else {
        //console.log('Success Response' + data);
          parseString(data, function (err: any, result: any) {
          //console.log(result);
            resolve(result.DeviceInfo.dpId);
          })
        }
      });
    });
  }

  getJSON_info(url: any, callback: any) {
    let xhr: any;
    if ((<any>window).XMLHttpRequest) {
      try {
        xhr = new XMLHttpRequest();
        xhr.open('DEVICEINFO', url, true);
        xhr.responseType = 'text';
      } catch (e) {
        xhr = new XMLHttpRequest();
        xhr.open('DEVICEINFO', url, true);
      }
    } else {
      xhr = new XMLHttpRequest();
      xhr.open('DEVICEINFO', url, true);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          callback(null, xhr.responseText);
        } else {
          callback(status);
        }
      }
    };
    xhr.send();
  };


  doBiometric() {
    return window.MyNamespace;
  }

  async _startTimer(seconds: number, reset: number) {
    let counter = seconds;
    const interval = setInterval(() => {
      counter--;
      this.showTimer = counter + ' seconds remaning';
      if (counter <= 0) {
        this.showTimer = '';
        clearInterval(interval);
      }
      if (reset) {
        this.showTimer = '';
        clearInterval(interval);
      }
    }, 1000);
  }
}
