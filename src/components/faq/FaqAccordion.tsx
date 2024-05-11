import React, { useState } from 'react';
import { IFaqAccordionCard } from '../../typs/__archive/faq.types';
import FaqAccordionCard from './FaqAccordionCard';

interface IProps {
	questions: IFaqAccordionCard[];
}

const FaqAccordion = ({ questions }: IProps) => {
	const [selectedItem, setSelectedItem] = useState<number>();

	const toggleHandler = (index: number) => {
		if (selectedItem !== index) {
			setSelectedItem(index);
		} else {
			setSelectedItem(undefined);
		}
	};

	return (
		<div>
			{questions.map(item => (
				<FaqAccordionCard
					key={item.id}
					data={item}
					isSelected={item.id === selectedItem}
					onClick={() => toggleHandler(item.id)}
				/>
			))}
		</div>
	);
};

export default FaqAccordion;
