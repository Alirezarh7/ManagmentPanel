import React from 'react';
import { Translation } from 'react-i18next';

export interface IProps {
    title:string
}

export interface IState {

}

class MenuHeader extends React.Component<IProps, IState> {
    render() {
        return (
            <li className="menu-title p-2 text-white-50 font-weight-bold small">
                <span><Translation>
                    {
                        t => t(this.props.title)
                    }
                </Translation></span>
            </li>
        );
    }
}

export default MenuHeader;