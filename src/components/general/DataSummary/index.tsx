import * as React from 'react';

interface IProps {
    legendTitle: string;
    children: React.ReactNode;
    fieldsetStyle?: any;
    legendStyle?: any;
}

export default function DataSummary(props: IProps) {
    const {legendTitle, children, legendStyle, fieldsetStyle} = props;
    return (
        <>
            <fieldset style={fieldsetStyle} className="data-summary-fieldset">
                <legend style={legendStyle} className="data-summary-legend">{legendTitle}</legend>
                    {children}
            </fieldset>
        </>
    );
}