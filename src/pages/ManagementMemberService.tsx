import ConfigControllerModal from "../components/Management/ConfigControllerModal";
import {useLocation} from "react-router-dom";
import CustomCard from "../components/general/Card/CustomCard";
import TitleInfo from "../components/general/Card/TitleInfo";
import {useTranslation} from "react-i18next";
import {useGetServices} from "../services/management.service";
import DataGrid from "../components/general/gridShow/DataGrid";
import {useDataToSet, useModalStore} from "../store/ZustandStore";

const ManagementMemberService = () => {
  const {state} = useLocation()
  const {t} = useTranslation()
  const {data: servicesData} = useGetServices()


  const headData = [
    {title: "نام", key: "persionName"},
    {title: "نام لاتین", key: "englishName"},
  ];
  const bodyData = servicesData?.map((destructure) => ({
    id: destructure.id,
    englishName: destructure.title,
    persionName: destructure.description,
    hasActions: true,
  })) ?? [];
  const {modals, open, close} = useModalStore()
  const {data: serviceID, setData: setServiceID} = useDataToSet()
  const isOpenConfigControllerModal = modals['configControllerModal']
  const onContinue = (row: any) => {
    setServiceID(row.id).then(() => {
      open('configControllerModal')
    })
  }

  return (
    <div>
      <CustomCard title={'اطلاعات فردی'}>
        <TitleInfo infoOne={t('name')} answerOne={state?.data?.name} infoTow={t('nationalCode')}
                   answerTow={state?.data?.nationalCode}/>
        <TitleInfo infoOne={'کارگزاری حج'} answerOne={state?.data?.kargozarNoHaj} infoTow={'کارگزاری عمره'}
                   answerTow={state?.data?.kargozarNoUmrah}/>
      </CustomCard>
      {servicesData ?
        <DataGrid onContinue={onContinue} bodyData={bodyData} headData={headData} activities={true}/> : null}
      <ConfigControllerModal id = {state.data.id} serviceID={serviceID ?? 0} onDismiss={() => close('configControllerModal')}
                             isOpen={isOpenConfigControllerModal}/>
    </div>
  );
};

export default ManagementMemberService;