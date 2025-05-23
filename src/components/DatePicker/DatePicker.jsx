import React from "react";
import styles from "./DatePicker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { getVisibleCalendarDays } from "./utils.js";

const DatePicker = ({ label, value, onChange, className = "" }) => {
  // --------------------- Init States ---------------------
  const [visibleCalendarMonth, setVisibleCalendarMonth] = useState(
    new Date().getMonth()
  );
  const [visibleCalendarYear, setVisibleCalendarYear] = useState(
    new Date().getFullYear()
  );

  const [visibleCalendarDays, setVisibleCalendarDays] = useState(
    getVisibleCalendarDays(visibleCalendarMonth, visibleCalendarYear)
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(value || null);

  const calendarRef = useRef(null);
  const isInitialMount = useRef(true);

  const containerId =
    label !== undefined
      ? label.toLowerCase().replace(" ", "-")
      : "date-picker-input";

  // --------------------- Use Effects ---------------------
  useEffect(() => {
    // Skip the first render to avoid unnecessary onChange call
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (onChange && selectedDate !== value && selectedDate !== null) {
      onChange(selectedDate);
    }
  }, [selectedDate, value]);

  useEffect(() => {
    if (value !== selectedDate) {
      setSelectedDate(value);
    }
  }, []);

  useEffect(() => {
    setVisibleCalendarDays(
      getVisibleCalendarDays(
        visibleCalendarMonth,
        visibleCalendarYear,
        selectedDate
      )
    );
  }, [visibleCalendarMonth, visibleCalendarYear, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------- Handlers ---------------------
  const goToCurrentMonth = () => {
    setVisibleCalendarMonth(new Date().getMonth());
    setVisibleCalendarYear(new Date().getFullYear());
  };

  const goToNextMonth = () => {
    if (visibleCalendarMonth + 1 > 11) {
      setVisibleCalendarMonth(0);
      setVisibleCalendarYear(visibleCalendarYear + 1);
    } else {
      setVisibleCalendarMonth(visibleCalendarMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (visibleCalendarMonth - 1 < 0) {
      setVisibleCalendarMonth(11);
      setVisibleCalendarYear(visibleCalendarYear - 1);
    } else {
      setVisibleCalendarMonth(visibleCalendarMonth - 1);
    }
  };

  const handleDateClick = (i) => {
    setSelectedDate(visibleCalendarDays.allDates[i].date);
    if (!isCurrentMonth(i)) {
      const date = new Date(visibleCalendarDays.allDates[i].date);
      setVisibleCalendarMonth(date.getMonth());
      setVisibleCalendarYear(date.getFullYear());
    }
    setIsCalendarOpen(false);
  };

  // --------------------- Helpers ---------------------
  const isCurrentMonth = (i) => {
    return visibleCalendarDays.allDates[i].isCurrentMonth;
  };

  const isSelected = (i) => {
    return visibleCalendarDays.allDates[i].isSelected;
  };

  const calendarDay = (i) => {
    return visibleCalendarDays.allDates[i].day;
  };

  const isToday = (i) => {
    return visibleCalendarDays.allDates[i].isToday;
  };

  // --------------------- Render ---------------------
  return (
    <div className={`${styles.container} ${className}`} ref={calendarRef}>
      <label htmlFor={containerId}>{label}</label>
      <input
        type="text"
        value={selectedDate || ""}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        readOnly
        id={containerId}
      />
      {isCalendarOpen && (
        <div className={styles.container__picker}>
          <div className={styles.container__picker__header}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goToPreviousMonth} />
            <FontAwesomeIcon icon={faHome} onClick={goToCurrentMonth} />
            <div className={styles.container__picker__header__selects}></div>
            <select
              value={visibleCalendarMonth}
              onChange={(e) =>
                setVisibleCalendarMonth(parseInt(e.target.value))
              }
            >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <select
              value={visibleCalendarYear}
              onChange={(e) => setVisibleCalendarYear(parseInt(e.target.value))}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - 75 + i}>
                  {new Date().getFullYear() - 75 + i}
                </option>
              ))}
            </select>
            <FontAwesomeIcon icon={faArrowRight} onClick={goToNextMonth} />
          </div>

          <div className={styles.container__picker__calendar}>
            <table>
              <thead>
                <tr className={styles.container__picker__calendar__header}>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: visibleCalendarDays.numberOfWeeksInMonth },
                  (_, i) => (
                    <tr
                      key={i}
                      className={styles.container__picker__calendar__row}
                    >
                      {Array.from({ length: 7 }, (_, j) => (
                        <td
                          key={j}
                          onClick={() => handleDateClick(i * 7 + j)}
                          className={`
                            ${styles.container__picker__calendar__row__day}
                            ${
                              isSelected(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__selected
                                : ""
                            }
                            ${
                              isCurrentMonth(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__currentMonth
                                : ""
                            }
                            ${
                              isToday(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__today
                                : ""
                            }`}
                        >
                          {calendarDay(i * 7 + j)}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
