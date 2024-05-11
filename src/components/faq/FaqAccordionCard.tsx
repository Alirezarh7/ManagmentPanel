import React from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { IFaqAccordionCard } from '../../typs/__archive/faq.types';

interface IProps {
	data: IFaqAccordionCard;
	isSelected: boolean;
	onClick: () => void;
}

const FaqAccordionCard = ({ data, isSelected, onClick }: IProps) => {
	return (
		<div
			className={`my-2 p-2 flex flex-col ${isSelected ? 'gap-5' : 'gap-0'} border rounded-lg cursor-pointer`}
			onClick={onClick}>
			<div className='flex flex-row justify-between'>
				<h5 className={`text-sm ${isSelected ? 'text-black' : 'text-gray-500'}`}>
					<BsQuestionLg className={'ml-2 inline w-6 h-6 text-[#bda157] bg-[#bda15730] rounded-full'} />
					{data.question}
				</h5>
				<HiOutlineChevronDown className={`${isSelected ? 'rotate-180' : ''}`} />
			</div>
			<div className={`font-medium grid ${isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}  transition-all duration-200`}>
				<div className='overflow-hidden font-normal'>{data.answer}</div>
			</div>
		</div>
	);
};

export default FaqAccordionCard;
