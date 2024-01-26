import { Component, OnInit } from '@angular/core';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';

@Component({
  selector: 'app-dwt',
  templateUrl: './dwt.component.html',
  styleUrls: ['./dwt.component.css']
})
export class DwtComponent implements OnInit {
  DWObject: WebTwain;
  selectSources: HTMLSelectElement;
  containerId = 'dwtcontrolContainer';
  deviceList=[];
  constructor() { }
  ngOnInit(): void {
    Dynamsoft.OnLicenseError = function (message, errorCode) {
      if(errorCode == -2808)
        message = '<div style="padding:0">Sorry. Your product key has expired. You can purchase a full license at the <a target="_blank" href="https://www.dynamsoft.com/store/dynamic-web-twain/#DynamicWebTWAIN">online store</a>.</div><div style="padding:0">Or, you can try requesting a new product key at <a target="_blank" href="https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&utm_source=in-product">this page</a>.</div><div style="padding:0">If you need any help, please <a target="_blank" href="https://www.dynamsoft.com/company/contact/">contact us</a>.</div>';
      (Dynamsoft.DWT as any).ShowMessage(message, {
        width: 680,
        headerStyle: 2
      });
   };
    Dynamsoft.DWT.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width: '300px', Height: '400px' }];
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    Dynamsoft.DWT.ResourcesPath = '/assets/dwt-resources';
	  Dynamsoft.DWT.ProductKey = "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9";
    Dynamsoft.DWT.Load();
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    this.selectSources = <HTMLSelectElement>document.getElementById("sources");
    this.DWObject.GetDevicesAsync().then((devices)=>{
      this.selectSources.options.length = 0;    
      for (var i = 0; i < devices.length; i++) { // Get how many sources are installed in the system
          this.selectSources.options.add(new Option(devices[i].displayName, i.toString())); // Add the sources in a drop-down list
          this.deviceList.push(devices[i]);
        }
      }).catch(function (exp) {
        alert(exp.message);
      });	
  }

  acquireImage(): void {
    if (!this.DWObject)
      this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
      if(this.selectSources.options.length > 0) {
        this.DWObject.SelectDeviceAsync(this.deviceList[this.selectSources.selectedIndex]).then(()=>{
          return this.DWObject.AcquireImageAsync({});
        }).then(()=>{
          return this.DWObject.CloseSourceAsync();
        }).catch((exp) =>{
          alert(exp.message);
        });
      } else {
        alert("No Source Available!");
      }
  }

  openImage(): void {
    if (!this.DWObject)
      this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    this.DWObject.IfShowFileDialog = true;
    /**
     * Note, this following line of code uses the PDF Rasterizer which is an extra add-on that is licensed seperately
     */
    this.DWObject.Addon.PDF.SetReaderOptions({
      convertMode:Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL
    });
    this.DWObject.LoadImageEx("", Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
      function () {
        //success
      }, function () {
        //failure
      });
  }
}
