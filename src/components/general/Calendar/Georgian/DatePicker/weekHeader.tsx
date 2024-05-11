import React from "react";

const weekHeader: React.FC = () => {
    return (
        <div className="weekTitle">
            <p className="weekName">Sun</p>
            <p className="weekName">Mon</p>
            <p className="weekName">Tue</p>
            <p className="weekName">Wen</p>
            <p className="weekName">Tuh</p>
            <p className="weekName">Fri</p>
            <p className="weekName">Sat</p>
        </div>
    );
};

export default weekHeader;
