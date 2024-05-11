import React, { Fragment, useEffect, useState } from 'react';
import '../NapAlerts/NapAlerts.css';
import NapAlert from './NapAlert';

export interface IProps {
	alerts: any[];
	clearAlerts: () => void;
}

const NapAlerts = (props: IProps) => {
	const [alerts, setAlerts] = useState<{ key: number; alert: any }[]>([]);
	const [s, updateState] = React.useState<any>();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	useEffect(() => {
		let newalerts = alerts;
		if (props.alerts.length > 0) {
			for (var i = 0; i < props.alerts.length; i++) {
				let key = Math.random() * 10000;
				newalerts.push({
					key: key,
					alert: <NapAlert alert={props.alerts[i]} comKey={key} onClose={removeAlert} />
				});
			}
			props.clearAlerts();
		}
		setAlerts(newalerts);
	}, [props.alerts]);
	const removeAlert = (key: number) => {
		let newalerts = alerts;
		newalerts.splice(
			newalerts.findIndex(x => x.key == key),
			1
		);
		setAlerts(newalerts);
		forceUpdate();
	};
	return (
		<React.Fragment>
			{alerts.length > 0 ? (
				<div className='NapNotify'>
					{alerts.map((alert: any, index: number) => {
						return <Fragment key={index}>{alert.alert}</Fragment>;
					})}
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
};

export default NapAlerts;
