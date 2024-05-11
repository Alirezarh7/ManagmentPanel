import React from 'react';

interface IProps {
	infoOne: string;
	infoTow?: string;
	answerOne: number | string;
	answerTow?: number | string;
}

const TitleInfo = ({ infoOne, infoTow, answerOne, answerTow }: IProps) => {
	return (
		<div className=' flex justify-between mx-3 items-center mt-2 md:justify-around md:w-full '>
			<div className='flex'>
				<strong className='flex'>{` ${infoOne}  :`}</strong>
				<p>{answerOne}</p>
			</div>
			<div className='flex '>
				<strong className='ml-1'>{` ${infoTow} :`}</strong>
				<p>{answerTow}</p>
			</div>
		</div>
	);
};

export default TitleInfo;
