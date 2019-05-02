import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { XunkCalendarModule } from 'src/app/games/xunk-calendar/xunk-calendar.module';
import { GamesComponent } from '../games/games.component';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private timeService: TimeService){}
  today = new Date();
  toggle: boolean = true;

  // @Output() selectedDate = new EventEmitter<any>();
  // @Input() dateFromSelect: GamesComponent;  /////esi pti havasaracnem day -in
  
  
  day: number ;
  public selDate = { date: 1, month: 1, year: 1 };

  ngOnInit() {
    this.day = this.timeService.dayfromCalendar.day;
    // this.selDate = XunkCalendarModule.getToday();
    // this.selectedDate.emit(this.day)
  }
  closingCalendar() {
    this.toggle = !this.toggle;
    // this.day = Date.now();
  }

  searchButton() {
    // this.selectedDate.emit(this.day)
    this.closingCalendar();
     this.timeService.dateChanged(this.day);
    
  }


  dateChanged(data: any) {
    this.day = Date.parse(`${data.month + 1}/${data.date}/${data.year}/`)

    // this.day = Date.parse(`${data.month + 1}/${data.date}/${data.year}/`)
     

  }

}