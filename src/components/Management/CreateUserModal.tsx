import {Controller, useForm} from "react-hook-form";
import Input from "../general/inputs/Input";
import { useGetSSOUserByMobile} from "../../services/user.service";
import CustomModal from "../general/Modal/CustomModal";
import CustomButton from "../general/Buttons/CustomButton";
import {enqueueSnackbar} from "notistack";
import DataSummary from "../general/DataSummary";
import CustomCard from "../general/Card/CustomCard";
import Title from "../tamato/myDocuments/cardInfo/Title";
import TitleInfo from "../tamato/myDocuments/cardInfo/TitleInfo.";


interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const CreateUserModal = ({isOpen, onDismiss}: IProps) => {
  const {control,watch} = useForm()
  const {refetch} = useGetSSOUserByMobile(watch('phoneNumber'))

  return (
    <CustomModal isOpen={isOpen} title={'اضافه کردن'} onDismiss={onDismiss} footerData={
      <div className='flex'>
        <CustomButton
          variant={'primary'}
          type={'button'}
          label='بله'
          onClick={() => {
          }}
        />
        <CustomButton variant={'Cancel'} type={'button'} label='خیر' onClick={onDismiss}/>
      </div>
    }>
      <div className='flex flex-col justify-center items-center'>
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

        <CustomCard title={'مشخصات'}>
          <TitleInfo infoOne={'نام'} answerOne={""}  infoTow={'کد ملی'} answerTow={'0205373523'} />
          <div className={'w-full flex justify-between gap-10 my-2'}>
            <Controller control={control} name={'hajNumber'} render={({field: {value, onChange}}) =>
              <Input value={value} onChange={onChange} placeholder={'کد کارگزاری حج'}/>
            }/>
            <Controller control={control} name={'hajNumber'} render={({field: {value, onChange}}) =>
              <Input value={value} onChange={onChange} placeholder={'کد کارگزاری عمره'}/>
            }/>
          </div>
        </CustomCard>

      </div>
    </CustomModal>
  )
    ;
};

export default CreateUserModal;