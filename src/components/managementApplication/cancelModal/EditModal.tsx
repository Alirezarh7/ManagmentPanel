import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import {IGetServices} from "../../../typs/managment.types";
import DataGrid from "../../general/gridShow/DataGrid";
import {useForm} from "react-hook-form";
import {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {enqueueSnackbar} from "notistack";


interface IProps {
  editService: boolean,
  setEditService: () => void,
  onAction: UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown>,
  dataForEdit: IGetServices
  getServiceRefetch: (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<any, Error>>
}

const EditModal = ({dataForEdit, setEditService, editService, onAction, getServiceRefetch}: IProps) => {

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

  const sendData = {
    id: dataForEdit.id,
    description: editPersianName,
    title: editEnglishName,
  }

  return (
    <>
      <CustomModal title={'اصلاح موارد'} isOpen={editService} onDismiss={setEditService} footerData={
        <>
          <div className=' w-full flex  items-center justify-center '>
            <CustomButton label={'ارسال'} onClick={() => onAction(sendData, {
              onSuccess: () => {
                getServiceRefetch().then(() => {
                  setEditService()
                })
                enqueueSnackbar('سرویس با موقعیت تغییر کرد', {variant: 'success'});
              }
            })}
                          type={'button'} variant='primary'/>
            <CustomButton label={'انصراف'} onClick={setEditService} type={'button'} variant='Cancel'/>
          </div>
        </>
      }>
        <DataGrid bodyData={bodyData} headData={headData} control={control}/>
      </CustomModal>
    </>
  );
};

export default EditModal;