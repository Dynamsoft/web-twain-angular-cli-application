import { Component, OnInit } from '@angular/core';
import * as Dynamsoft from 'dwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-cli-application';
  DWObject: WebTwain;
  selectSources: HTMLSelectElement;
  ngOnInit() {
    Dynamsoft.WebTwainEnv.AutoLoad = false;
    Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '583px', Height: '513px' }];
    Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    /**
     * In order to use the full version, do the following
     * 1. Change Dynamsoft.WebTwainEnv.Trial to false
     * 2. Replace A-Valid-Product-Key with a full version key
     * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version 
     *    resource files that you obtain after purchasing a key
     */
    Dynamsoft.WebTwainEnv.Trial = true;
    Dynamsoft.WebTwainEnv.ProductKey = "A-Valid-Product-Key";
    //Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.2";

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
    if (this.DWObject.SourceCount > 0 && this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)) {
      const onAcquireImageSuccess = () => { this.DWObject.CloseSource(); };
      const onAcquireImageFailure = onAcquireImageSuccess;
      this.DWObject.OpenSource();
      this.DWObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    } else {
      alert("No Source Available!");
    }
  }
}
