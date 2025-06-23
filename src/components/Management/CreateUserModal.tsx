import {Controller, useForm} from "react-hook-form";
import Input from "../general/inputs/Input";
import {useCreateUser2, useGetSSOUserByMobile, useGetUserActionsByUserId} from "../../services/user.service";
import CustomModal from "../general/Modal/CustomModal";
import CustomButton from "../general/Buttons/CustomButton";
import {enqueueSnackbar} from "notistack";
import CustomCard from "../general/Card/CustomCard";
import TitleInfo from "../tamato/myDocuments/cardInfo/TitleInfo.";
import CustomSelect from "../general/Select/CustomSelect";
import {useEffect, useState} from "react";
import {useGetProvinceListByCountryId} from "../../services/basicInfo.service";
import NapLoading from "../general/NapLoading/NapLoading";
import CustomToggle from "../general/toggle/CustomToggle";
import {useQueryClient} from "@tanstack/react-query";
import {useDataToSet} from "../../store/ZustandStore";


interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  id?:number,
  editData:number
}

const CreateUserModal = ({isOpen, onDismiss,editData}: IProps) => {

  const {setData:setEditData} = useDataToSet()

  const {refetch:ActionsByUserIdRefetch} = useGetUserActionsByUserId(editData)
  console.log(editData ,'editData')
  useEffect(() => {
    if(editData){
      ActionsByUserIdRefetch()
    }
  }, [editData]);
  useEffect(() => {
    if (!isOpen){
      setEditData(0)
    }
  }, [isOpen]);

  const {control, watch} = useForm()
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const {
    refetch, data: SSOUserData, isLoading: SSOUserIsLoading, isRefetching: SSOUserIsRefetching} = useGetSSOUserByMobile(watch('phoneNumber'))
  const {
    data: ProvinceData, refetch: provinceListRefetch, isLoading: provinceListLoading, isRefetching: provinceListRefetching} = useGetProvinceListByCountryId()

  useEffect(() => {
    if (isOpen && SSOUserData) {
      provinceListRefetch()
    }
  }, [isOpen, SSOUserData])



  const {mutate} = useCreateUser2()
  const submitData = () =>{
    const sendData = {
      name: SSOUserData!.name,
      family: SSOUserData!.family,
      nationalCode: SSOUserData!.nationalCode,
      provinceId: watch('provinceID'),
      kargozarNoHaj: watch('kargozarNoHaj'),
      kargozarNoUmrah: watch('kargozarNoUmrah'),
      mobile: SSOUserData!.phoneNumber,
      isActive: isEnabled
    }
    mutate(sendData,{onSuccess:()=>{
        useQueryClient().invalidateQueries(
          {queryKey: ['advancedSearchUsers']}
        ).then(()=>{
          onDismiss()
          enqueueSnackbar('شخص مورد نظر با موفقیت اضافه شد',{variant: 'success'})
        })
      },onError:(err)=>{
        console.log(err)
        // enqueueSnackbar('شخص مورد نظر با موفقیت اضافه شد',{variant: 'success'})
      }})
  }



  return (
    <>
      <NapLoading
        loading={SSOUserIsLoading || SSOUserIsRefetching || provinceListLoading || provinceListRefetching}/>
      <CustomModal overflow={true} isOpen={isOpen} title={'اضافه کردن'} onDismiss={onDismiss} footerData={
        <div className='flex'>
          <CustomButton
            variant={'primary'}
            type={'button'}
            label='بله'
            onClick={submitData}
          />
          <CustomButton variant={'Cancel'} type={'button'} label='خیر' onClick={onDismiss}/>
        </div>
      }>
        <div className='flex flex-col justify-center items-center'>
          {!editData ?
          <div className={' max-w-52 mt-3'}>
            <Controller control={control} name={'phoneNumber'} render={({field: {value, onChange}}) =>
              <Input value={value} onChange={onChange} buttonTitle={'جستجو'} placeholder={'شماره موبایل'}
                     disabledButton={false}
                     withButton={true}
                     onClick={() => {
                       console.log(value)
                       if (value.toString().length < 11) return enqueueSnackbar('شماره موبایل به درستی وارد نشده است.', {variant: "warning"})
                       else refetch()
                     }}
              />
            }/>
          </div>
          : null}
          {SSOUserData ?
            <CustomCard title={'مشخصات'}>
              <TitleInfo infoOne={'نام'} answerOne={SSOUserData.name + ' ' + SSOUserData.family}
                         infoTow={'کد ملی'} answerTow={SSOUserData.nationalCode}/>
              <div className={'w-full grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-5 my-4'}>
                <Controller control={control} name={'kargozarNoHaj'} render={({field: {value, onChange}}) =>
                  <Input value={value} onChange={onChange} placeholder={'کد کارگزاری حج'}/>
                }/>
                <Controller control={control} name={'kargozarNoUmrah'} render={({field: {value, onChange}}) =>
                  <Input value={value} onChange={onChange} placeholder={'کد کارگزاری عمره'}/>
                }/>
                <Controller control={control} name={'provinceID'} render={({field: {value, onChange}}) =>
                  <CustomSelect options={ProvinceData} valueID={value} onChange={onChange}
                                placeholder={'کد کارگزاری عمره'}/>
                }/>
                <CustomToggle checked={isEnabled} onChange={setIsEnabled} label={'فعال'} />
              </div>
            </CustomCard>
            : null}
        </div>
      </CustomModal>
    </>
  )
    ;
};

export default CreateUserModal;