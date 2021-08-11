var suncalc = require('suncalc');


export class DateUtils {
  /**
   * Subtract two dates and return the time in ms.
   * @returns The difference in ms
   */
  public static subtract(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  /**
   * Check if a date and time is within a certain range assuming the same date
   * @returns {boolean} True if dateAndTime is >= startDate and dateTime <= endDate, otherwise false
   */
  public static isWithinTimeRange(dateAndTime: Date, startDate: Date, endDate: Date): boolean {
    return (dateAndTime.getHours() > startDate.getHours() || (dateAndTime.getHours() === startDate.getHours() && dateAndTime.getMinutes() >= startDate.getMinutes()))
      && (dateAndTime.getHours() < endDate.getHours() || (dateAndTime.getHours() === endDate.getHours() && dateAndTime.getMinutes() <= endDate.getMinutes()));
  }

  /**
   * Parse a time string and return the current date with the parsed time
   * @param str A time string in the form of 23:59
   */
  public static parseTime(str: string): Date {
    let time = str.split(':');
    let date = new Date();
    if (time.length === 2) {
      let hours = parseInt(time[0]);
      if (hours >= 0 && hours <= 23) {
        date.setHours(hours);
        let minutes = parseInt(time[1]);
        if (minutes >= 0 && minutes <= 59) {
          date.setMinutes(minutes);
          date.setSeconds(0);
          date.setMilliseconds(0);
        }
      }
    }
    return date;
  }

  public static isDayTime(): boolean {
    const now = new Date();
    let isDayTime = this.isWithinTimeRange(now, this.parseTime("6:00"), this.parseTime("18:00"));
    return isDayTime;
  }
}



