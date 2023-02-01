import WindowDatePicker from "window-date-picker"
const picker = new WindowDatePicker({
    // initial value
    value: null,
    // selectors
    el: "#picker",
    inputEl: "#demo",
    toggleEl: "#toggle",
    // or 'HOUR', 'DATEHOUR'
    type: "DATE",
    // date format
    dateType: "DD/MM/YYYY",
    // or '24'
    hourType: "12",
    // allows empty value
    allowEmpty: true,
    // shows the button
    showButtons: false,
    // toggles the date & time picker when clicking input
    inputToggle: false,
    // language
    lang: 'en',
    // if it is set true, up arrow increases value, down arrow decreases
    orientation: false,
    // shows arrow buttons
    showArrowButtons: false
  });
  
  // export default {
  //   DAYS_ABBR: ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   MONTHS: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //   MONTHS_ABBR: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   AM_PM: ['AM', 'PM'],
  //   BUTTONS: ['CANCEL', 'OK'],
  //   INVALID_DATE: 'Invalid Date'
  // }

export {picker}