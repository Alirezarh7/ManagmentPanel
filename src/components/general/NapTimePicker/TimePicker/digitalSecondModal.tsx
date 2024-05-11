import React from "react";

type IProps = {
    seconds: number[];
    opacity: number;
    secondSelected: (val: number) => void;
};
const DigitalSecondModal = (props: IProps) => {
    return (
        <div className="digitalMinuteModal py-3" style={{ opacity: props.opacity }}>
            {props.seconds.map((second, i) => {
                if (second % 5 == 0)
                    return (
                        <div key={i} className="minuteName" onClick={() => props.secondSelected(second)}>
                            <span>{second}</span>
                        </div>
                    );
            })}
        </div>
    );
};

export default DigitalSecondModal;
