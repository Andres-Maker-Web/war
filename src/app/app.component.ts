import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Grabaciones', url: '/recording-list/recording-list', icon: 'mail' }
  ];
  constructor() {}
}
