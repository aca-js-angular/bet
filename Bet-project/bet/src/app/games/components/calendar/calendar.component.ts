import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { XunkCalendarModule } from 'src/app/games/xunk-calendar/xunk-calendar.module';
import { GamesComponent } from '../games/games.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  toggle: boolean = true;

  @Output() selectedDate = new EventEmitter<any>();
  // @Input() dateFromSelect: GamesComponent;  /////esi pti havasaracnem day -in
  day: number = Date.now();
  public selDate = { date: 1, month: 1, year: 1 };

  ngOnInit() {
    // this.selDate = XunkCalendarModule.getToday();
  }
  closingCalendar() {
    this.toggle = !this.toggle;
    // this.day = Date.now();
  }

  searchButton() {
    this.selectedDate.emit(this.day)
    this.closingCalendar();
  }


  dateChanged(data: any) {

    this.day = Date.parse(`${data.month + 1}/${data.date}/${data.year}/`)


  }

}