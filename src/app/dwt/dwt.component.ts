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
  constructor() { }
  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width: '300px', Height: '400px' }];
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    Dynamsoft.DWT.ResourcesPath = 'assets/dwt-resources';
	  Dynamsoft.DWT.ProductKey = 't00901wAAAFGokK55GCTHFf8RWZ8bKjNRD1O+Gf0xA6MUdkmYI6zSueLnBjy55bNxl/YW1HkZykS/h0xYHBuFFwIDbexR567425Cx3hnuwAewN5DyXtRd/ATLnyy+';
    Dynamsoft.DWT.Load();
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
	this.bWASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService;
    let count = this.DWObject.SourceCount;
    this.selectSources = <HTMLSelectElement>document.getElementById("sources");
    this.selectSources.options.length = 0;
    for (let i = 0; i < count; i++) {
      this.selectSources.options.add(new Option(this.DWObject.GetSourceNameItems(i), i.toString()));
    }
  }

  acquireImage(): void {
    if (!this.DWObject)
      this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    if (this.DWObject.SourceCount > 0 && this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)) {
      const onAcquireImageSuccess = () => { this.DWObject.CloseSource(); };
      const onAcquireImageFailure = onAcquireImageSuccess;
      this.DWObject.OpenSource();
      this.DWObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
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
