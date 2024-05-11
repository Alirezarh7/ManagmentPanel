import React from "react";

type IProps = {
    second: number;
    opacity: number;
    seconds: number[];
    secondSelected: (val: number) => void;
};
const SecondsModal = (props: IProps) => {
    const { second, opacity, seconds, secondSelected } = props;
    return (
        <div className="minuteModal clock" style={{ opacity: opacity }}>
            <div className="minuteHandleBase" style={{ transform: `rotate(${180 + (second / 5) * 30}deg)` }}>
                <div className="minuteHandle">
                    {" "}
                    <div className="minuteHandHead">&nbsp;</div>{" "}
                </div>
            </div>
            {seconds.map((second, i) => {
                return (
                    second % 5 === 0 ?
                        <div
                            key={"min" + second}
                            className="minute"
                            style={{ transform: `rotateZ(calc(6deg * ${i + 1}))` }}>
                            <span
                                style={{ transform: `rotateZ(calc(-6deg * ${i + 1}))` }}
                                onClick={() => secondSelected(second)}>
                                {second}
                            </span>
                        </div>
                        : ""
                );
            })}
            {seconds.map((second, i) => {
                return (
                    <div
                        key={"min" + second}
                        className="minute1"
                        style={{ transform: `rotateZ(calc(6deg * ${i + 1}))` }}>
                        <span className="dotTime" onClick={() => secondSelected(second)}>
                            .
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default SecondsModal;
