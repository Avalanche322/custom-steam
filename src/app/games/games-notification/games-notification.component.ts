import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-notification',
  templateUrl: './games-notification.component.html',
  styleUrls: ['./games-notification.component.scss']
})
export class GamesNotificationComponent implements OnInit {
  @Input() name!: string;
  @Input() messageType!: string;
  @Input() actionType!: boolean;
  constructor() { }

  ngOnInit(): void {
    if(this.messageType === 'library') {
      this.actionType = true;
    }
  }
}
