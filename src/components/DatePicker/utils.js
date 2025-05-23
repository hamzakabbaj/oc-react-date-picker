export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

export const getLastDayOfMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDay();
};

export const getNumberOfWeeksInMonth = (month, year) => {
  // Get Number of sundays in the month
  // Get Number of saturdays in the month
  // min of the two + 1
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstSunday = 7 - firstDay.getDay();
  const lastSaturday = lastDay.getDate() - lastDay.getDay();

  const numberOfSundays = Math.floor((lastSaturday - firstSunday) / 7) + 1;
  const numberOfSaturdays = Math.floor((lastSaturday - firstSunday) / 7) + 1;

  return Math.min(numberOfSundays, numberOfSaturdays) + 1;
};

export const getVisibleCalendarDays = (month, year, selectedDate) => {
  const daysInMonth = getDaysInMonth(month, year);
  const daysInPreviousMonth = getDaysInMonth((month - 1) % 12, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const lastDayOfMonth = getLastDayOfMonth(month, year);
  const numberOfWeeksInMonth = getNumberOfWeeksInMonth(month, year);

  const previousMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPreviousMonth - firstDayOfMonth + i + 1
  );

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const nextMonthDays = Array.from(
    { length: 6 - lastDayOfMonth },
    (_, i) => i + 1
  );

  const previousMonthDates = previousMonthDays.map((day) => {
    return {
      date: new Date(year, (month - 1) % 12, day + 1)
        .toISOString()
        .split("T")[0],
      day: day,
      isCurrentMonth: false,
      isToday:
        new Date(year, (month - 1) % 12, day + 1)
          .toISOString()
          .split("T")[0] === new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, (month - 1) % 12, day + 1).toISOString().split("T")[0],
    };
  });

  const currentMonthDates = currentMonthDays.map((day) => {
    return {
      date: new Date(year, month, day + 1).toISOString().split("T")[0],
      day: day,
      isCurrentMonth: true,
      isToday:
        new Date(year, month, day + 1).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, month, day + 1).toISOString().split("T")[0],
    };
  });

  const nextMonthDates = nextMonthDays.map((day) => {
    return {
      date: new Date(year, month + 1, day + 1).toISOString().split("T")[0],
      day: day,
      isCurrentMonth: false,
      isToday:
        new Date(year, month + 1, day + 1).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, month + 1, day + 1).toISOString().split("T")[0],
    };
  });

  const allDates = [
    ...previousMonthDates,
    ...currentMonthDates,
    ...nextMonthDates,
  ];

  // console.log(allDates);

  return { allDates, numberOfWeeksInMonth };
};
