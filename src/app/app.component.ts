/// <reference types="dwt" />

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Using Dynamic Web TWAIN in Angular Project';

  acquireImage(): void {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    const bSelected = dwObject.SelectSource();
    if (bSelected) {
      const onAcquireImageSuccess = () => { dwObject.CloseSource(); };
      const onAcquireImageFailure = onAcquireImageSuccess;
      dwObject.OpenSource();
      dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    }
  }
}
