import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  nextHours: any = {
    hours: 500000000000,
  };

  dayfromCalendar: any = {
    day:0,
    
  };


  constructor() { }

  selectTime(selectedTimeHours): number {

    return this.nextHours.hours = selectedTimeHours;
    //this.selectedDayFromCalendar = 0;
  }
  dateChanged(data: any) {

    return this.dayfromCalendar.day = data
    // this.toDay = this.day;

  }

}
