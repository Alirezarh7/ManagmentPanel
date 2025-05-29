import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import DataGrid from "../../general/gridShow/DataGrid";
import {useForm} from "react-hook-form";
import {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {enqueueSnackbar} from "notistack";


interface IProps {
  edit: boolean,
  currentStep: number
  serviceId?: number
  controllerId?: number
  setEdit: () => void,
  onAction: UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown>,
  dataForEdit: any
  Refetch: (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<any, Error>>
}

const EditModal = ({dataForEdit, setEdit, edit, onAction, Refetch, currentStep, serviceId, controllerId}: IProps) => {


  const {control, watch} = useForm(
    {
      defaultValues: {
        editEnglishName: dataForEdit.title,
        editPersianName: dataForEdit.description
      }
    }
  )
  const editPersianName = watch('editPersianName');
  const editEnglishName = watch('editEnglishName');


  const headData = [
    {title: "نام", key: "persianName", numberInput: true, name: 'editPersianName'},
    {title: "نام لاتین", key: "englishName", numberInput: true, name: 'editEnglishName'},
  ];
  const bodyData = dataForEdit ?
    [{
      id: dataForEdit.id,
      englishName: dataForEdit.title,
      persianName: dataForEdit.description,
    }] : [];

  const sendData = currentStep === 1 ? {
    id: dataForEdit.id,
    description: editPersianName,
    title: editEnglishName,
  } : currentStep === 2 ? {
    serviceId: serviceId,
    id: dataForEdit.id,
    description: editPersianName,
    title: editEnglishName,
  } : {
    serviceId: serviceId,
    controllerId: controllerId,
    id: dataForEdit.id,
    title: editEnglishName,
    description: editPersianName
  }

  return (
    <>
      <CustomModal title={'اصلاح موارد'} isOpen={edit} onDismiss={setEdit} footerData={
        <>
          <div className=' w-full flex  items-center justify-center '>
            <CustomButton label={'ارسال'} onClick={() => onAction(sendData, {
              onSuccess: () => {
                Refetch().then(() => {
                  setEdit()
                })
                enqueueSnackbar('سرویس با موقعیت تغییر کرد', {variant: 'success'});
              }
            })}
                          type={'button'} variant='primary'/>
            <CustomButton label={'انصراف'} onClick={setEdit} type={'button'} variant='Cancel'/>
          </div>
        </>
      }>
        <DataGrid bodyData={bodyData} headData={headData} control={control}/>
      </CustomModal>
    </>
  );
};

export default EditModal;