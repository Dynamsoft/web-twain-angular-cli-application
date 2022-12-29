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
  bWASM = false;
  deviceList=[];
  constructor() { }
  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width: '300px', Height: '400px' }];
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    Dynamsoft.DWT.ResourcesPath = '/assets/dwt-resources';
	  Dynamsoft.DWT.ProductKey = 't00901wAAAGi71cktM2NG4toMEJ/g3egqded0C1EBhYMai/rMb+9PivaU9+1xp3qau4200cRaQBLw3fqD/MrH0+LKNIdtwU4rfxe0NzcomBYGKCsgTgto+AWw+SxV';
    Dynamsoft.DWT.Load();
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    this.bWASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService;
    this.selectSources = <HTMLSelectElement>document.getElementById("sources");
    if(!Dynamsoft.Lib.env.bMobile){
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
    this.DWObject.Addon.PDF.SetConvertMode(Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL);
    this.DWObject.LoadImageEx("", Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
      function () {
        //success
      }, function () {
        //failure
      });
  }
}
