import React from "react";

type IProps = {
    years: number[];
    opacity: number;
    yearSelected: (val: number) => void;
};
const YearModal = (props: IProps) => {
    const currentYear = new Date().getFullYear()
    const { years, opacity, yearSelected } = props;
    return (
        <div className="yearModal" style={{ opacity: opacity }}>
            {years.map((y, i) => {
                return (
                    <div
                        className={y === currentYear ? "years yearActive" : "years"}
                        key={i}
                        onClick={() => yearSelected(y)}>
                        <span> {y} </span>
                    </div>
                );
            })}
        </div>
    );
};

export default YearModal;
