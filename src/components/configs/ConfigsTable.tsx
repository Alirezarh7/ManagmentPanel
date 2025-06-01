import {IConfigResponse} from '../../typs/config.types';
import DataGrid from "../general/gridShow/DataGrid";
import EditConfigModal from "./EditConfigModal";
import React, {useEffect, useState} from "react";

interface IProps {
  configs: IConfigResponse[] | undefined;
}

const ConfigsTable = ({configs}: IProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [dataSelect, setDataSelect] = useState<IConfigResponse>();
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
    allData:destructure,
    configActionTypeId: destructure.configActionTypeId === 1 ? 'حج' : "عمره",
    isOpenCompletion: destructure.isOpenCompletion ? "✅" : "❌",
    isOpenPassengerGroup: destructure.isOpenPassengerGroup ? "✅" : "❌",
    isOpenReserve: destructure.isOpenReserve ? "✅" : "❌",
    isOpenPayment: destructure.isOpenPayment ? "✅" : "❌",
    isActive: destructure.isActive ? "✅" : "❌",
    isEnableDispatchAndReligion: destructure.isEnableDispatchAndReligion ? "✅" : "❌",
    hasActions: true,

  })) ?? [];

  useEffect(() => {
    if(dataSelect && activeModal){
      setShowEditModal(true);
      setActiveModal(false)
    }
  }, [dataSelect?.id,activeModal]);
  return (
    <div className={'w-full'}>
      <div className={'w-full flex justify-center items-center pb-10'}>
        <DataGrid bodyData={bodyData} headData={headData} activities={true} onEdit={(row:any) => {
          setDataSelect(row.allData)
          setActiveModal(true)
        }}/>
      </div>
      {dataSelect ? <EditConfigModal data={dataSelect} isOpen={showEditModal}
                                             onSuccess={() => setShowEditModal(false)}
                                             onCancel={() => setShowEditModal(false)}/> : null }
    </div>
  );
};

export default ConfigsTable;
