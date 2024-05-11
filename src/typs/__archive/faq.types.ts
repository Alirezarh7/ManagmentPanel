import { ReactNode } from 'react';

export interface IFaqAccordionCard {
	id: number;
	question: string;
	answer: ReactNode;
}

export interface IFaqData {
	category: string;
	questions: IFaqAccordionCard[];
}
