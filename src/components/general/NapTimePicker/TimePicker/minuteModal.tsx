import React from "react";

type IProps = {
    minute: number;
    opacity: number;
    minutes: number[];
    minuteSelected: (val: number) => void;
};
const MinutesModal = (props: IProps) => {
    const { minute, opacity, minutes, minuteSelected } = props;
    return (
        <div className="minuteModal clock" style={{ opacity: opacity }}>
            <div className="minuteHandleBase" style={{ transform: `rotate(${180 + (minute / 5) * 30}deg)` }}>
                <div className="minuteHandle">
                    {" "}
                    <div className="minuteHandHead">&nbsp;</div>{" "}
                </div>
            </div>
            {minutes.map((minute, i) => {
                return (
                    minute % 5 === 0 ?
                        <div
                            key={"min" + minute}
                            className="minute"
                            style={{ transform: `rotateZ(calc(6deg * ${i + 1}))` }}>
                            <span
                                style={{ transform: `rotateZ(calc(-6deg * ${i + 1}))` }}
                                onClick={() => minuteSelected(minute)}>
                                {minute}
                            </span>
                        </div>
                        : ""
                );
            })}
            {minutes.map((minute, i) => {
                return (
                    <div
                        key={"min" + minute}
                        className="minute1"
                        style={{ transform: `rotateZ(calc(6deg * ${i + 1}))` }}>
                        <span className="dotTime" onClick={() => minuteSelected(minute)}>
                            .
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default MinutesModal;
