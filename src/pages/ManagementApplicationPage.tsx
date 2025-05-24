import React, { useState} from 'react';
import {useLocation} from "react-router-dom";
import CustomStepper from "../components/general/stepper/CustomStepper";
import CreateService from "../components/managementApplication/createService/CreateService";
import CreateController from "../components/managementApplication/CreateController";
import CreateAction from "../components/managementApplication/CreateAction";
import {useForm} from "react-hook-form";
import {TUseForm} from "../typs/managment.types";


const ManagementApplicationPage = () => {


  const Location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const {setValue,watch} = useForm<TUseForm>()

  console.log(watch('serviceId'))

  const next = (forceStep?: number): any => {
    if (currentStep <= 2) setCurrentStep(forceStep ? forceStep : currentStep + 1);
  };
  const prev = (): any => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };


  let steps = ['اکشن','کنترلر','سرویس'];
  let getContent = () => {
    switch (currentStep) {
      case 0:
        return <CreateService setValue={setValue} next={next} />
      case 1:
        return <CreateController serviceId={watch('serviceId')}/>
      case 2:
        return <CreateAction/>
    }
  };

  return (
    <>
      <div className=' max-w-screen-xl w-full mx-auto bg-white'>
        <CustomStepper steps={steps} content={getContent()} currentStep={currentStep} onNext={next}
                       onPrev={prev}/>
        {getContent()}
      </div>
    </>
  );
};

export default ManagementApplicationPage;