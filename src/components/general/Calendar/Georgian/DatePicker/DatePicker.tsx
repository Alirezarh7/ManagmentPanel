import React, { useState, useEffect } from 'react';
import * as utils from '../utils';
import NDate from '@nepo/ndate';
import Header from './Header';
import WeekDays from './WeekDays';
import WeekHeader from './weekHeader';
import MonthModal from './monthModal';
import YearModal from './yearModal';
import HoursModal from './hourModal';
import MinutesModal from './minuteModal';

export interface ISendDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}

type IProps = {
    theDate: Date;
    showTime?: boolean;
    max?: Date;
    min?: Date;
    headerImage?: string;
    setTime?: boolean;
    sendDate: (newDate: ISendDate) => void;
    position?: "bottom" | "right";
}

const CalendarPage: React.FC<IProps> = (props: IProps) => {

    const [mainDate, setDate] = useState<NDate>(new NDate(props.theDate) || new NDate())
    const [mainYear, setYear] = useState<number>(new NDate().year);
    const [mainMonth, setMonth] = useState<number>(0);
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const [mainday, setday] = useState<number>(0);
    const [mainDays, setDays] = useState<any>([])
    const [mainHour, setHour] = useState<number>(0);
    const [mainMinute, setMinute] = useState<number>(0);
    const [yearModal, showYearsModal] = useState<boolean>(false);
    const [monthModal, showMonthsModal] = useState<boolean>(false);
    const [daysModal, showDaysModal] = useState<boolean>(true);
    const [hoursModal, showHoursModal] = useState<boolean>(false);
    const [minutesModal, showMinutesModal] = useState<boolean>(false);
    const [modalsOpacity, setOpacity] = useState<number>(1);
    const [timeFormat, setTimeFormat] = useState<"am" | "pm">("am");
    const [years, setyears] = useState<number[]>([]);
    const monthName = utils.MONTH_NAMES;
    const daysOfMonth = utils.MONTH_DAYS;
    const hours = utils.HOURS;
    const secoundHours = utils.SECOUND_HOURS;
    const minutes = utils.MINUTES()
    // const years = utils.YEARS(mainYear)

    useEffect(() => {
        let selectDate = new NDate(props.theDate || new NDate());
        let year = selectDate.year;
        const theMonthIndex = selectDate.month;
        const selectDay = selectDate.day;
        setDate(selectDate)
        setYear(year)
        setMonthIndex(theMonthIndex)
        setMonth(theMonthIndex + 1)
        setday(selectDay)
        setyears(utils.YEARS(mainYear))
        setHour(selectDate.hour)
        setMinute(selectDate.minute)
        setTimeFormat(selectDate.hour > 12 || selectDate.hour === 0 ? "pm" : "am")
        setDays(createMonth(year, theMonthIndex))
    }, [])

    const createMonth = (year: number, monthIndex: number) => {
        const cal = new NDate(new Date(year, monthIndex, 1))
        let currentSelectYear = year;
        let theDaysOfMonth = daysOfMonth[monthIndex];
        let dayOfWeek = cal.dayOfWeek();
        if (theDaysOfMonth < 29) {
            if (NDate.isLeapYear(year)) {
                theDaysOfMonth = 29;
            }
        }

        if (dayOfWeek < 0) {
            dayOfWeek = 6;
        }
        const totalDays = theDaysOfMonth + dayOfWeek;
        const daysArray = [];
        let day = 1;

        for (let i = 0; i < totalDays; i++) {
            if (i < dayOfWeek) {
                daysArray.push(null)
            } else if (i - dayOfWeek < theDaysOfMonth) {
                daysArray.push(new NDate(new Date(currentSelectYear, monthIndex, day)));
                day++;
            } else {
                daysArray.push(null)
            }
        }
        return daysArray;
    };

    const resetModals = () => {
        setOpacity(0)
        showYearsModal(false);
        showMonthsModal(false);
        showDaysModal(false)
        showHoursModal(false);
        showMinutesModal(false);
    }
    const changeView = () => {
        setTimeout(() => {
            setOpacity(1)
        }, 100);
    };
    const dayTime = (type: string) => {
        if (type === "h") {
            resetModals()
            showHoursModal(true)
            changeView();
        } else {
            resetModals()
            showMinutesModal(true)
            changeView();
        }
    };
    const pervMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        currentMonth--;
        if (currentMonth === 0) {
            theMainYear--;
            currentMonth = 12;
        }
        const newDate = new NDate(new Date(theMainYear, currentMonth, 1));
        setDays(createMonth(theMainYear, currentMonth - 1));
        setYear(theMainYear)
        setDate(newDate)
        setMonth(currentMonth)
        resetModals()
        showDaysModal(true)
        changeView();
    };
    const nextMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        currentMonth++;
        if (currentMonth === 13) {
            theMainYear++;
            currentMonth = 1;
        }
        const newDate = new NDate(new Date(theMainYear, currentMonth, 1));
        setDays(createMonth(theMainYear, currentMonth - 1));
        setYear(theMainYear)
        setDate(newDate)
        setMonth(currentMonth)
        resetModals()
        showDaysModal(true)
        changeView();

    };

    const daySelected = (y: number, m: number, d: number) => {
        const newDate = new NDate(new Date(y, m - 1, d, mainHour, mainMinute));
        if (!props.setTime) {

            setday(d);
            setDate(newDate);
            props.sendDate({ year: y, month: m, day: d, hour: 0, minute: 0 });
            return;
        }
        
        setYear(y);
        setMonth(m);
        setday(d);
        resetModals();
        showHoursModal(true)
        changeView();
    }

    const max = props.max ? new NDate(props.max).date : null;
    const min = props.min ? new NDate(props.min).date : null;
    const theMonthSelected = (theMonth: number) => {

        setMonth(theMonth);
        setDays(createMonth(mainYear, theMonth - 1))
        resetModals();
        showDaysModal(true);
        changeView();
    };
    const theYearSelected = (y: number) => {
        setYear(y);
        resetModals()
        showMonthsModal(true)
        changeView();
    };
    const theHourSelected = (h: number) => {
        setHour(h);
        resetModals()
        showMinutesModal(true)
        changeView();
    };
    const theMinuteSelected = (m: number) => {
        setMinute(m);
        setDays(createMonth(mainYear, mainMonth - 1))
        resetModals()
        showDaysModal(true)
        changeView();
        props.sendDate({
            year: mainYear,
            month: mainMonth,
            day: mainday,
            hour: mainHour,
            minute: m,
        });
    };
    return (
        <div className="niliDatePicker" style={props.position === "bottom" ? {bottom: "100%"} : {top: "100%"} }>
            <Header
                year={mainYear}
                month={mainMonth}
                day={mainday}
                monthName={monthName}
                showHour={hoursModal}
                hour={mainHour}
                minute={mainMinute}
                showMinute={minutesModal}
                headerImage={props.headerImage ? props.headerImage : null}
                dayTime={(val) => dayTime(val)}
                nextMonth={(val) => nextMonth(val)}
                pervMonth={(val) => pervMonth(val)}
                monthModal={() => {
                    resetModals()
                    showMonthsModal(true)
                    changeView()
                }}
                yearModal={() => {
                    resetModals()
                    showYearsModal(true)
                    changeView()
                }}
                showTime={props.showTime ? true : false}
                model={"DatePicke"} />
            {daysModal && <WeekHeader />}
            {daysModal && <WeekDays
                days={mainDays}
                year={mainYear}
                month={mainMonth}
                max={max}
                min={min}
                selectedDate={mainDate}
                daySelected={(y, m, d) => daySelected(y, m, d)}
            />}
            {monthModal && <MonthModal
                monthName={monthName}
                opacity={modalsOpacity}
                monthSelected={(month) => theMonthSelected(month)} />}
            {yearModal && <YearModal
                years={years}
                opacity={modalsOpacity}
                yearSelected={(year) => theYearSelected(year)} />}
            {hoursModal || minutesModal ? (
                <div style={{ position: "relative" }}>
                    {hoursModal && <HoursModal
                        hour={mainHour}
                        opacity={modalsOpacity}
                        showHour={hoursModal}
                        hours={hours}
                        secoundHours={secoundHours}
                        timeFormat={timeFormat}
                        hourSelected={(hour) => theHourSelected(hour)}
                    />}
                    {minutesModal ? (
                        <MinutesModal
                            minute={mainMinute}
                            opacity={modalsOpacity}
                            minutes={minutes}
                            minuteSelected={(min) => theMinuteSelected(min)}
                        />
                    ) : null}
                    
                    {hoursModal && <div className="ampm">
                            <div
                                className={timeFormat === "am" ? "am active" : "am"}
                                onClick={() => setTimeFormat("am")}>
                                AM
                            </div>
                            <div
                                className={timeFormat === "pm" ? "pm active" : "pm"}
                                onClick={() => setTimeFormat("pm")}>
                                PM
                            </div>
                        </div>}
                </div>
            ) : null}
        </div>
    )
}

export default CalendarPage