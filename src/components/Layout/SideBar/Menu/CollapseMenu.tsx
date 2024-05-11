import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Translation } from 'react-i18next';

export interface IProps {
	title: string;
	icon: string;
	id: string;
	children?: any;
	style?: CSSProperties;
	action?: (state: boolean) => void;
	openState?: boolean;
}

export interface IState {}

function CollapseMenu(props: IProps): React.JSX.Element {
	return (
		<li>
			<a
				data-toggle='collapse'
				className='cup flex justify-between items-center mt-1 menu_item collapsed'
				role='button'
				aria-expanded='false'
				href={'#' + props.id}
				aria-controls={props.id}>
				<div>
					<span style={props.style ? props.style : {}} className={'mdi mdi-20px line-height-20px ' + props.icon}></span>
					<span style={props.style ? props.style : {}}>
						<Translation>{t => t(props.title)}</Translation>
					</span>
				</div>
				<span
					style={props.style ? props.style : {}}
					className='mdi mdi-chevron-left mdi-18px line-height-18px cup collpase-hide'></span>
			</a>
			<div className='collapse' id={props.id}>
				{props.children}
			</div>
		</li>
	);
}

export default CollapseMenu;
