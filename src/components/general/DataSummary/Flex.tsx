import React from 'react';

interface IProps {
	label: string;
	value: string;
}
const Flex = (props: IProps) => {
	const { value, label } = props;
	return (
		<>
			<div className='flex items-center justify-around m-3'>
				<span style={{ fontWeight: 'bold', margin: '0px 10px' }}>{label}:</span>
				<span>{value}</span>
			</div>
		</>
	);
};

export default Flex;
