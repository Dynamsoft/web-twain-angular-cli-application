import { Component, OnInit } from '@angular/core';
import * as Dynamsoft from 'dwt';

@Component({
  selector: 'app-dwt',
  templateUrl: './dwt.component.html',
  styleUrls: ['./dwt.component.css']
})
export class DwtComponent implements OnInit {
  DWObject: WebTwain;
  selectSources: HTMLSelectElement;
  ngOnInit() {
    Dynamsoft.WebTwainEnv.AutoLoad = false;
    Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '300px', Height: '400px' }];
    Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    /**
     * In order to use the full version, do the following
     * 1. Change Dynamsoft.WebTwainEnv.Trial to false
     * 2. Replace A-Valid-Product-Key with a full version key
     * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version 
     *    resource files that you obtain after purchasing a key
     */
    Dynamsoft.WebTwainEnv.Trial = true;
    /**
     * Get a free trial here https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
     */
    Dynamsoft.WebTwainEnv.ProductKey = 't0140cQMAAGnOvWTyoOR4HEFckJJmzMWpZcPSHyXGAvYGxgEkg5fBnRoFPslaAayuNOe5B/gp7plUCIUAtf6Ttb98d7Ifv/3A6Mxsu7CZLJhKHUuMorfuu/E/ZrOfuSyoMz7zjXKjgvHcMO1HiGbvyHv+GBWM54ZpP4Wej2RorGBUMJ4b4tx40yqnXlIiqvs='; //2020-04-24
    //Dynamsoft.WebTwainEnv.ProductKey = "A-Valid-Product-Key";
    //Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.3.1";
    Dynamsoft.WebTwainEnv.Load();
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    let count = this.DWObject.SourceCount;
    this.selectSources = <HTMLSelectElement>document.getElementById("sources");
    this.selectSources.options.length = 0;
    for (let i = 0; i < count; i++) {
      this.selectSources.options.add(new Option(this.DWObject.GetSourceNameItems(i), i.toString()));
    }
  }

  acquireImage(): void {
    if (!this.DWObject)
      this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
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
      this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    this.DWObject.IfShowFileDialog = true;
    /**
     * Note, this following line of code uses the PDF Rasterizer which is an extra add-on that is licensed seperately
     */
    this.DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConvertMode.CM_RENDERALL);
    this.DWObject.LoadImageEx("", EnumDWT_ImageType.IT_ALL,
      function () {
        //success
      }, function () {
        //failure
      });
  }
}
