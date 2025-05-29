import {IConfigResponse} from '../../typs/config.types';
import ConfigsTableRow from './ConfigsTableRow';
import DataGrid from "../general/gridShow/DataGrid";
import EditConfigModal from "./EditConfigModal";
import React, {useState} from "react";

interface IProps {
  configs: IConfigResponse[] | undefined;
}

const ConfigsTable = ({configs}: IProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const headData = [
    {title: "نوع سرویس", key: "configActionTypeId"},
    {title: "تکمیل اطلاعات", key: "isOpenCompletion"},
    {title: "گروه بندی", key: "isOpenPassengerGroup"},
    {title: "رزرو", key: "isOpenReserve"},
    {title: "پرداخت", key: "isOpenPayment"},
    {title: "بروز رسانی", key: "isActive"},
    {title: "استان و مذهب", key: "isEnableDispatchAndReligion"},
  ];
  const bodyData = configs?.map((destructure) => ({
    configActionTypeId: destructure.configActionTypeId === 1 ? 'حج' : "عمره",
    isOpenCompletion: destructure.isOpenCompletion ? "✅" : "❌",
    isOpenPassengerGroup: destructure.isOpenPassengerGroup ? "✅" : "❌",
    isOpenReserve: destructure.isOpenReserve ? "✅" : "❌",
    isOpenPayment: destructure.isOpenPayment ? "✅" : "❌",
    isActive: destructure.isActive ? "✅" : "❌",
    isEnableDispatchAndReligion: destructure.isEnableDispatchAndReligion ? "✅" : "❌",
    hasActions: true,
  })) ?? [];


  return (
    <div className={'w-full'}>
      {/*<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default'>*/}
      {/*  <div className='max-w-full '>*/}
      {/*    <table className='w-full table-auto'>*/}
      {/*      <thead>*/}
      {/*      <tr className='bg-gray-100 text-right dark:bg-meta-4 max-sm:text-[9px]'>*/}
      {/*        <th className=' py-3 px-3  text-black dark:text-white'>نوع سرویس</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center font-medium text-black  '>گروه بندی</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center font-medium text-black  '>رزرو</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center font-medium text-black  '>پرداخت</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center  font-medium text-black '> تکمیل اطلاعات</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center font-medium text-black  '>بروز رسانی</th>*/}
      {/*        <th className=' py-3 px-0.5 text-center font-medium text-black  '>عملیات</th>*/}

      {/*      </tr>*/}
      {/*      </thead>*/}
      {/*      <tbody>{configs?.map(item => <ConfigsTableRow key={item.id} data={item}/>)}</tbody>*/}
      {/*    </table>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={'w-full flex justify-center items-center'}>
        <DataGrid bodyData={bodyData} headData={headData} activities={true} onEdit={() => setShowEditModal(true)}/>
      </div>
      {configs?.map(item => <EditConfigModal data={item} isOpen={showEditModal}
                                             onSuccess={() => setShowEditModal(false)}
                                             onCancel={() => setShowEditModal(false)}/>)}
    </div>
  );
};

export default ConfigsTable;
