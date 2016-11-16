'use strict';

exports.__esModule = true;

var _calendarViewUnits;

var views = {
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
};

var directions = exports.directions = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN'
};

var datePopups = exports.datePopups = {
  TIME: 'time',
  CALENDAR: 'calendar'
};

var calendarViews = exports.calendarViews = views;

// export const calendarViewHierarchy = {
//   [views.MONTH]:   views.YEAR,
//   [views.YEAR]:    views.DECADE,
//   [views.DECADE]:  views.CENTURY
// }

var calendarViewUnits = exports.calendarViewUnits = (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits);