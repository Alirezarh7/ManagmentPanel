import React from "react";

const weekHeader: React.FC = () => {
    return (
        <div className="weekTitle">
            <p className="weekName">شنبه</p>
            <p className="weekName">یک</p>
            <p className="weekName">دو</p>
            <p className="weekName">سه</p>
            <p className="weekName">چهار</p>
            <p className="weekName">پنچ</p>
            <p className="weekName">جمعه</p>
        </div>
    );
};

export default weekHeader;
