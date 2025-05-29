import React from 'react';
import {useTranslation} from "react-i18next";

export interface IProps {
  steps: string[];
  content?: any;
  currentStep: number;
  onNext: () => any;
  onPrev: () => void;
}

const CustomStepper = ({onPrev, onNext, steps, currentStep, content}: IProps) => {
  const [t] = useTranslation();
  return (
    <ol className=' flex w-full text-gray-900 font-medium sm:text-base '>
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex ${index + 1 <= currentStep ? 'text-indigo-600' : 'text-gray-400'} ${index < steps.length - 1 ? 'w-full' : 'w-fit'}`}>
          <div className='flex max-md:flex-col items-center px-2'>
            <div
              className={`w-10 h-10 mx-1.5 md:px-4 rounded-full flex items-center justify-center  mb-2 ${index + 1 <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-400'}`}>
              {index + 1}
            </div>
            <span className='text-center w-full max-xs:text-[11px]'>{t(step)}</span>
          </div>
          {index < steps.length && (
            <div
              className={` mt-6 grow h-0.5 ${index + 1 < currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default CustomStepper;
