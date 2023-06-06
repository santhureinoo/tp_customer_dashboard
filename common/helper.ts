import moment from "moment";
import { getCookieParser } from "next/dist/server/api-utils";

export function truncateFileName(str: string, max: number) {
  const splitStr = str.split('.');
  return str.length > max ? str.substring(0, max - 1) + '…' : str;
}

export function getMonths(lastestLiveDate: string, year: string) {
  const currentDate = moment(lastestLiveDate, 'MM/YYYY');
  const months = [
    {
      value: '01',
      display: 'January',
    },
    {
      value: '02',
      display: 'February',
    },
    {
      value: '03',
      display: 'March',
    },
    {
      value: '04',
      display: 'April',
    },
    {
      value: '05',
      display: 'May',
    },
    {
      value: '06',
      display: 'June',
    },
    {
      value: '07',
      display: 'July',
    },
    {
      value: '08',
      display: 'August',
    },
    {
      value: '09',
      display: 'September',
    },
    {
      value: '10',
      display: 'October',
    },
    {
      value: '11',
      display: 'November',
    },
    {
      value: '12',
      display: 'December',
    },
  ];

  if (currentDate.year().toString() !== year) {
    return months;
  } else {
    return months.filter((month, index) => {
      if (index <= currentDate.month()) {
        return month;
      }
    });
  }
}

export function bytesToSize(bytes: number) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function numberWithCommas(x?: number, fixed = 0) {
  if (x && x > 999) {
    let numX = Number(x);
    if (fixed > 0) {
      // numX.toFixed(fixed);
      // Math.pow(x,10);
      numX = Math.round(numX * Math.pow(10, fixed)) / Math.pow(10, fixed);
    }
    return numX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  else {
    return x && !isNaN(x) ? Math.round(x * Math.pow(10, fixed)) / Math.pow(10, fixed) : x;
  }
}

export function zeroPad(num: number | string, places: number) {
  return String(num).padStart(places, '0');
}


export function dateValueForQuery(month: string, year: string, noDay = false) {
  let finalStr = "";

  if (month !== 'All') {
    finalStr = (noDay ? '' : '01/') + month;
  }

  if (year !== 'All') {
    finalStr = finalStr + '/' + year;
  } else {
    finalStr = finalStr + '/';
  }

  return finalStr;

}

export function getIronSessionCookieSetting() {
  return {
    cookieName: process.env.IRON_SESSION_COOKIE || '',
    password: process.env.IRON_SESSION_SECRET || '',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: false
    },
  };
}