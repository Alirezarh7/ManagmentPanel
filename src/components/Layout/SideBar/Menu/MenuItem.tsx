import React from 'react';
import { NavLink } from 'react-router-dom';
import { Translation } from 'react-i18next';
import { Tooltip } from 'antd';

export interface IProps {
	link?:
		| string
		| {
				pathname: string;
				state: {
					fromDashboard: boolean;
				};
		  };
	title: string;
	icon: string;
	external?: boolean;
	externalLink?: string;
	color?: string;
	spaceYExternalLink?: string;
	spaceY?: string;
	isOpen?: boolean;
}

export interface IState {}

class MenuItem extends React.Component<IProps, IState> {
	render() {
		return (
			<li>
				<Tooltip
					color='rgb(189, 161, 87)'
					placement='left'
					title={!this.props.isOpen && <Translation>{t => t(this.props.title)}</Translation>}>
					{!this.props.external ? (
						<NavLink
							style={{ color: 'black' }}
							className={`cup flex justify-between items-center menu_item--active ${this.props.spaceY ? this.props.spaceY : 'mt-1'} menu_item`}
							to={`${this.props.link}`}>
							<span>
								<span style={{ color: 'black' }} className={'mdi mdi-20px line-height-20px ' + this.props.icon}></span>
								<span style={{ color: 'black' }}>
									<Translation>{t => t(this.props.title)}</Translation>
								</span>
							</span>
						</NavLink>
					) : (
						<a
							className={`cup flex justify-between items-center mt-1 menu_item ${this.props.spaceYExternalLink ? this.props.spaceYExternalLink : 'mt-3'}`}
							href={this.props.externalLink as string}>
							<span style={{ color: 'black' }}>
								<span
									style={{ color: this.props.color ? this.props.color : 'black' }}
									className={'mdi mdi-20px line-height-20px ' + this.props.icon}></span>
								<span style={{ color: this.props.color ? this.props.color : 'black' }}>
									<Translation>{t => t(this.props.title)}</Translation>
								</span>
							</span>
						</a>
					)}
				</Tooltip>
			</li>
		);
	}
}

export default MenuItem;
