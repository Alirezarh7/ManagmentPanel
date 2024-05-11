import React, { useState, useEffect, useRef } from 'react';
import TimePicker, { ITimeObject } from "./TimePicker/TimePicker"
import "./style.css"

type IProps = {
    required?: boolean
    placeholder?: string;
    className?: string;
    position?: "bottom" | "right";
    name?: string;
    id?: string;
    onChange?: (value: ITimeObject) => void;
    onChangeText?: (value: string) => void;
    max?: ITimeObject;
    min?: ITimeObject;
    minText?: string
    maxText?: string
    defaultValue?: ITimeObject
    defaultValueText?: string
    value?: ITimeObject
    valueText?: string
    withSecond?: boolean
    type: '12' | '24'
    clockType?: 'analog' | 'digital' | 'duration'
}
const NapTimePicker: React.FC<IProps> = (props: IProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [timeModal, showTimeModal] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<ITimeObject | null>(null);
    const [timeFormat, setTimeFormat] = useState<"am" | "pm">("am");
    const theTime: ITimeObject = selectedTime ? selectedTime : props.defaultValue ? props.defaultValue : { hour: 0, minute: 0, second: 0 }
    useEffect(() => {
        if (props.defaultValue)
            timepickerHandler(props.defaultValue);
        if (props.defaultValueText) {
            const time = textToTime(props.defaultValueText);
            if (time)
                timepickerHandler(time);
        }
        if (props.value)
            timepickerHandler(props.value);
        else if (props.valueText) {
            const time = textToTime(props.valueText);
            if (time)
                timepickerHandler(time);
            else {
                if (props.min)
                    timepickerHandler(props.min);
                else
                    timepickerHandler(getTodayTime());
            }
        } else
            timepickerHandler(getTodayTime());
    }, [])
    useEffect(() => {
        if (props.value)
            timepickerHandler(props.value);
        else if (props.valueText) {
            const time = textToTime(props.valueText);
            if (time)
                timepickerHandler(time);
            else {
                if (props.min)
                    timepickerHandler(props.min);
                else
                    timepickerHandler(getTodayTime());
            }
        } else
            timepickerHandler(getTodayTime());
    }, [props.value, props.valueText])
    const textToTime = (val: string): ITimeObject | null => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        const bigTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
        if (timeRegex.test(val) && !props.withSecond) {
            const mHour = Number(val.substr(0, 2));
            const mMinute = Number(val.substr(3, 2));
            let targetTime: ITimeObject = { hour: mHour, minute: mMinute, second: 0 }
            if (min && compare(targetTime, min) == 'less')
                return min;
            else if (max && compare(targetTime, max) == 'bigger')
                return max;
            else
                return targetTime;
        } else if (bigTimeRegex.test(val) && props.withSecond) {
            const mHour = Number(val.substr(0, 2));
            const mMinute = Number(val.substr(3, 2));
            const mSecond = Number(val.substr(6, 2));

            let targetTime: ITimeObject = { hour: mHour, minute: mMinute, second: mSecond }
            if (min && compare(targetTime, min) == 'less')
                return min;
            else if (max && compare(targetTime, max) == 'bigger')
                return max;
            else
                return targetTime;
        } else
            return null;
    }
    const getTodayTime = (): ITimeObject => {
        if (props.clockType != 'duration') {
            var today = new Date();
            return { hour: today.getHours(), minute: today.getMinutes(), second: today.getSeconds() };
        } else
            return { hour: 0, minute: 0, second: 0 };
    }
    const timepickerHandler = (value: ITimeObject) => {
        let val = `${value.hour > 9 ? value.hour : ("0" + value.hour).substr(0, 2)}:${value.minute > 9 ? value.minute : ("0" + value.minute).substr(0, 2)}${props.withSecond ? ':' + (value.second > 9 ? value.second : ("0" + value.second).substr(0, 2)) : ''}`;
        setTimeFormat(value.hour < 12 ? 'am' : 'pm')
        showTimeModal(false)
        setInputValue(val)
        setSelectedTime(value)
        if (props.onChange)
            props.onChange(value);
        if (props.onChangeText)
            props.onChangeText(val);
    };
    const timeHandler = (time: ITimeObject) => {
        if (min && compare(time, min) == 'less')
            timepickerHandler(min);
        else if (max && compare(time, max) == 'bigger')
            timepickerHandler(max);
        else
            timepickerHandler(time);
        showTimeModal(false)
    }
    const compare = (time1: ITimeObject, time2: ITimeObject): 'less' | 'bigger' | 'equal' => {
        let timeSecond1 = (time1.hour * 60 * 60) + (time1.minute * 60) + time1.second;
        let timeSecond2 = (time2.hour * 60 * 60) + (time2.minute * 60) + time2.second;
        if (timeSecond1 == timeSecond2)
            return 'equal';
        else if (timeSecond1 <= timeSecond2)
            return 'less';
        else
            return 'bigger';
    }
    const getMin = (): ITimeObject | undefined => {
        if (props.min)
            return props.min;
        else if (props.minText) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const bigTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
            if (timeRegex.test(props.minText) && !props.withSecond) {
                const mHour = Number(props.minText.substr(0, 2));
                const mMinute = Number(props.minText.substr(3, 2));
                return { hour: mHour, minute: mMinute, second: 0 };
            } else if (bigTimeRegex.test(props.minText) && props.withSecond) {
                const mHour = Number(props.minText.substr(0, 2));
                const mMinute = Number(props.minText.substr(3, 2));
                const mSecond = Number(props.minText.substr(6, 2));
                return { hour: mHour, minute: mMinute, second: mSecond }
            }
        }
        return undefined;
    }
    const getMax = (): ITimeObject | undefined => {
        if (props.max)
            return props.max;
        else if (props.maxText) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const bigTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
            if (timeRegex.test(props.maxText) && !props.withSecond) {
                const mHour = Number(props.maxText.substr(0, 2));
                const mMinute = Number(props.maxText.substr(3, 2));
                return { hour: mHour, minute: mMinute, second: 0 };
            } else if (bigTimeRegex.test(props.maxText) && props.withSecond) {
                const mHour = Number(props.maxText.substr(0, 2));
                const mMinute = Number(props.maxText.substr(3, 2));
                const mSecond = Number(props.maxText.substr(6, 2));
                return { hour: mHour, minute: mMinute, second: mSecond }
            }
        }
        return undefined;
    }
    const min = props.min || props.minText ? getMin() : null;
    const max = props.max || props.maxText ? getMax() : null;
    const onChangeHandler = (event: any) => {
        const time = textToTime(event.target.value);
        if (time)
            timepickerHandler(time);
    };
    useEffect(() => {
        if (selectedTime != null) {
            if (min && compare(selectedTime, min) == 'less')
                timepickerHandler(min);
            else if (max && compare(selectedTime, max) == 'bigger')
                timepickerHandler(max);
        }
    }, [min, max])
    return (
        <div className="Main">
            {timeModal && (
                <React.Fragment>
                    <div className="timePickerCloser" onClick={() => showTimeModal(false)}></div>
                    <TimePicker
                        position={props.position}
                        withSecond={props.withSecond}
                        clockType={props.clockType ? props.clockType : 'digital'}
                        max={props.max}
                        min={props.min}
                        value={theTime}
                        timeFormat={timeFormat}
                        setTimeFormat={setTimeFormat}
                        sendTime={(value) => timeHandler(value)} />
                </React.Fragment>
            )}
            <input
                className={props.className}
                type="text"
                id={props.id}
                name={props.name}
                value={inputValue}
                required={props.required}
                onChange={onChangeHandler}
                onFocus={() => showTimeModal(true)}
                // guide={true}
                onClick={() => showTimeModal(true)}
                placeholder={props.placeholder} />
        </div>
    )
}

export default NapTimePicker