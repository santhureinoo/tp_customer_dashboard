export function truncateFileName(str: string, max: number) {
  const splitStr = str.split('.');
  return str.length > max ? str.substring(0, max - 1) + '…' : str;
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
    if(fixed > 0 ) {
      numX.toFixed(fixed);
    }
    return numX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  else {
    return x;
  }
}

export function zeroPad(num: number, places: number) {
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