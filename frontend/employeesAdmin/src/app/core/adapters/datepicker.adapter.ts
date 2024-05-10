import { Injectable } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: this.toInteger(date[0]),
        month: this.toInteger(date[1]),
        year: this.toInteger(date[2]),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? `${this.isNumber(date.month) ? this.padNumber(date.month) : ''}${
          this.DELIMITER
        }${this.isNumber(date.day) ? this.padNumber(date.day) : ''}${
          this.DELIMITER
        }${date.year}`
      : '';
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  isNumber(value: any): value is number {
    return !isNaN(this.toInteger(value));
  }

  padNumber(value: number): string {
    return this.isNumber(value) ? `0${value}`.slice(-2) : '';
  }
}
