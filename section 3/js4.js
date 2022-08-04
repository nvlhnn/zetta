/**
 * Direction
 * Get name of the day of 4 days ago from today
 *
 * Expected result:
 * 1. if date now = monday
 * 2. then result = thursday
 */
function result() {
  // write your code here
  var days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  var date = new Date();
  var d = new Date(date.getTime() - 4 * 24 * 60 * 60 * 1000);

  return days[d.getDay()];
}

console.log(result());
