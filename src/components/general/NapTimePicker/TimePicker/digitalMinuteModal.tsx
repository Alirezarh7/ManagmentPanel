import React from "react";

type IProps = {
    minutes: number[];
    opacity: number;
    minuteSelected: (val: number) => void;
};
const DigitalMinuteModal = (props: IProps) => {
    return (
        <div className="digitalMinuteModal py-3" style={{ opacity: props.opacity }}>
            {props.minutes.map((minute, i) => {
                if (minute % 5 == 0)
                    return (
                        <div key={i} className="minuteName" onClick={() => props.minuteSelected(minute)}>
                            <span>{minute}</span>
                        </div>
                    );
            })}
        </div>
    );
};

export default DigitalMinuteModal;
