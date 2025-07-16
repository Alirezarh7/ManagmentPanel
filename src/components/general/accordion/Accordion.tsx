import React, {useState} from 'react';
import {HiOutlineChevronDown} from "react-icons/hi";
import {HiOutlineClipboardDocumentList} from "react-icons/hi2";
import {useGetUserActionsByUserIdAndServiceId} from "../../../services/user.service";

interface IProps{
  serviceID:number,
  id:number,
}
const Accordion = ({serviceID,id}:IProps) => {
  const {} =useGetUserActionsByUserIdAndServiceId(id,serviceID)
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const toggleHandler = (index: number) => {
    if (selectedItem !== index) {
      setSelectedItem(index);
    } else {
      setSelectedItem(null);
    }
  };


  return (

        <div
          className={`p-2 my-2 md:mx-8 mx-2  flex flex-col border !border-black rounded-lg cursor-pointer`}
          onClick={()=>toggleHandler(0)}
        >
          <div className='flex flex-row justify-between'>
            <h5 className={`text-[14px]  `}>
              <HiOutlineClipboardDocumentList className='ml-3 inline w-8 h-8 text-[#bda157] bg-[#bda15730] rounded-full'/>
              asdas
            </h5>
            <HiOutlineChevronDown
              className={`w-8 h-8 p-1 mt-1 `}
            />
          </div>
          <div
            className={` grid ${selectedItem === 0 ? 'grid-rows-[1fr] border-t !border-gray-400  py-5' : 'grid-rows-[0fr]'} transition-all duration-200`}>
            <div className='overflow-hidden font-normal w-full '>
              <div className='flex justify-center'>

              </div>
              {/*<div>*/}
              {/*  <TitleInfo infoOne={'شماره کارگزار'} answerOne={item.kargozarNo ?? '--'} infoTow={'کد شعبه'} answerTow={item.branchCode ?? '--'} />*/}
              {/*  <TitleInfo infoOne={'شماره سند'} answerOne={item.sanadNo ?? '--'} infoTow={'کد ملی گیرنده'} answerTow={item.nationalCodeBuyer ? item.nationalCodeBuyer : '--'} />*/}
              {/*  <TitleInfo infoOne={'آدرس کارگزار'} answerOne={item.address ?? '--'} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
  );
};

export default Accordion;