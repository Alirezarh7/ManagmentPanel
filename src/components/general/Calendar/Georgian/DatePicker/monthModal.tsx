import React from "react";

type IProps = {
    monthName: string[];
    opacity: number;
    monthSelected: (val: number) => void;
};
const MonthModal = (props: IProps) => {
    const { monthName, opacity, monthSelected } = props;
    return (
        <div className="monthModal" style={{ opacity: opacity }}>
            {monthName.map((month, i) => {
                return (
                    <div key={i} className="monthNames" onClick={() => monthSelected(i + 1)}>
                        <span>{month}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default MonthModal;
