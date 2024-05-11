import React from 'react';



export interface IProps {
    title: string;
}

class CardTitle extends React.Component<IProps> {
    state = { title: "" }

    render() {
        return (

            <div className="card-header">
                <div className="card-title">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default (CardTitle);