import React from "react";

type IProps = {
    hour: number;
    opacity: number;
    showHour: boolean;
    timeFormat: string;
    hours: number[];
    secoundHours: number[];
    hourSelected: (val: number) => void;
};
const HoursModal = (props: IProps) => {
    const { hour, opacity, showHour, hours, secoundHours, timeFormat, hourSelected } = props;
    return (
        <div className="hourModal clock" style={{ opacity: opacity }}>
            <div className="clockHandleBase" style={{ transform: `rotate(${180 + hour * 30}deg)` }}>
                <div className="clockHandle">
                    {" "}
                    <div className="clockHandHead">&nbsp;</div>{" "}
                </div>
            </div>
            {showHour
                ? timeFormat === "am"
                    ? hours.map((hour, i) => {
                          return (
                              <div
                                  key={"h" + hour}
                                  className="hours"
                                  style={{ transform: `rotateZ(calc(30deg * ${i + 1}))` }}>
                                  <span
                                      style={{ transform: `rotateZ(calc(-30deg * ${i + 1}))` }}
                                      onClick={() => hourSelected(hour)}>
                                      {" "}
                                      {hour}{" "}
                                  </span>
                              </div>
                          );
                      })
                    : secoundHours.map((hour, i) => {
                          return (
                              <div
                                  key={"h2" + hour}
                                  className="hours"
                                  style={{ transform: `rotateZ(calc(30deg * ${i + 1}))` }}>
                                  <span
                                      style={{ transform: `rotateZ(calc(-30deg * ${i + 1}))` }}
                                      onClick={() => hourSelected(hour)}>
                                      {" "}
                                      {hour}{" "}
                                  </span>
                              </div>
                          );
                      })
                : null}
        </div>
    );
};

export default HoursModal;
