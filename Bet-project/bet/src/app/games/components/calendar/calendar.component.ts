import { Component, OnInit } from '@angular/core';
import { XunkCalendarModule } from 'src/app/games/xunk-calendar/xunk-calendar.module';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  day: number = Date.now();
  public selDate = { date: 1, month: 1, year: 1 };

  ngOnInit() {
      this.selDate = XunkCalendarModule.getToday();
      
  }
  /** Log changes in date */
  dateChanged(data: any) {
    this.day = Date.parse(`${data.month}/${data.date}/${data.year}/`)
    console.log(this.day);
  }

}