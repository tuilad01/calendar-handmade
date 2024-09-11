import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Calendar, CalendarModule, Month } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import moment from 'moment';

// interface GenerateOptions {
//   startDayOfWeek?: number;
//   hasOutRange?: boolean;
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('calendar')
  calendar!: Calendar;

  // constructor() {
  //   const cal = new Calendar();
  //   month =
  // }

  selectedMonth: any[] = [];
  selectedDayOfWeek: any[] = [];
  constructor() {
    const now = moment();
    this.selectedMonth = this.generateMonth(
      now.month() - 2,
      now.year(),
      1,
      false
    );
    this.selectedDayOfWeek = this.generateWeek(0);
    console.log(this.generateWeek(0));
  }

  generateWeek(startDayOfWeek: number) {
    const week = [
      startDayOfWeek,
      (startDayOfWeek + 1) % 7,
      (startDayOfWeek + 2) % 7,
      (startDayOfWeek + 3) % 7,
      (startDayOfWeek + 4) % 7,
      (startDayOfWeek + 5) % 7,
      (startDayOfWeek + 6) % 7,
    ];

    const dayOfWeek = [
      'Chu nhat',
      'Thu 2',
      'Thu 3',
      'Thu 4',
      'Thu 5',
      'Thu 6',
      'Thu 7',
    ];
    return week.map((dow) => dayOfWeek[dow]);
  }

  generateMonth(
    month: number,
    year: number,
    startDayOfWeek: number = 1,
    hasOutRange: boolean = false
  ) {
    const list: any[] = [];

    const selectedMonth = moment(new Date(year, month, 1));
    const previousMonth = moment(selectedMonth).subtract(1, 'months');

    console.log(selectedMonth.calendar(), previousMonth.calendar());

    // from 26-8 - 25-9
    const fromDate = moment(previousMonth).date(26);
    const toDate = moment(selectedMonth).date(25);

    let startDate = moment(fromDate);
    while (startDate.day() != startDayOfWeek) {
      startDate = moment(startDate).subtract(1, 'days');
    }

    let endDayOfWeek = (startDayOfWeek - 1) % 7;
    let endDate = moment(toDate);
    while (endDate.day() != endDayOfWeek) {
      endDate = moment(endDate).add(1, 'days');
    }

    let date = moment(startDate);
    let week: any[] = [];
    const max = 90;
    let count = 0;

    while (date >= startDate && date <= endDate && count < max) {
      if (date.day() === startDayOfWeek) {
        week = [];
      }

      if (!hasOutRange && (date < fromDate || date > toDate)) {
        week.push(null);
      } else {
        week.push(date);
      }

      if (date.day() == endDayOfWeek) {
        list.push(week);
      }

      date = moment(date).add(1, 'days');

      count++;
    }

    console.log(list);
    return list;
  }

  ngAfterViewInit() {
    const now = new Date();
    const month = now.getMonth();

    const lastMonth = this.calendar.createMonth(month - 1, 2024);

    //this.divHello.months.shift(lastMonth.dates[lastMonth.dates?.length-1])
    if (lastMonth.dates) {
      this.calendar.months[0].dates!.unshift(
        lastMonth.dates[lastMonth.dates.length - 1]
      );

      this.calendar.months[0].dates!.unshift(
        lastMonth.dates[lastMonth.dates.length - 2]
      );

      //console.log(this.calendar.months);
    }
  }

  rangeDates: Date[] = [
    new Date(2024, 7, 26, 0, 0, 0),
    new Date(2024, 8, 25, 0, 0, 0),
  ];

  // show() {
  //   console.log(this.rangeDates);
  // }
  selecteDate(date: Date) {
    //console.log(date);
  }
}
