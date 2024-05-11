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
            <div className="clockHandleBase" style={{ transform: `rotate(${180 + (minute / 5) * 30}deg)` }}>
                <div className="clockHandle">
                    {" "}
                    <div className="clockHandHead">&nbsp;</div>{" "}
                </div>
            </div>
            {minutes.map((minute, i) => {
                return (
                    <div
                        key={"min" + minute}
                        className="minute"
                        style={{ transform: `rotateZ(calc(6deg * ${i + 1}))` }}>
                        {minute % 5 === 0 ? (
                            <span
                                style={{ transform: `rotateZ(calc(-6deg * ${i + 1}))` }}
                                onClick={() => minuteSelected(minute)}>
                                {" "}
                                {minute}{" "}
                            </span>
                        ) : (
                            <span className="dotTime" onClick={() => minuteSelected(minute)}>
                                .
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MinutesModal;
