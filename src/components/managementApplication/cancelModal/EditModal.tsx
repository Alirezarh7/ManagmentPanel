import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import {IGetServices} from "../../../typs/managment.types";
import DataGrid from "../../general/gridShow/DataGrid";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


interface IProps {
  editService: boolean,
  setEditService: () => void,
  dataForEdit: IGetServices
}

const EditModal = ({dataForEdit, setEditService, editService}: IProps) => {

  const {control, reset, watch} = useForm(
    {
      defaultValues: {
        editEnglishName: dataForEdit.title
      }
    }
  )

  console.log(watch())

  const headData = [
    {title: "نام", key: "", numberInput: true, name: 'editPersianName'},
    {title: "نام لاتین", key: "englishName", numberInput: true, name: 'editEnglishName'},
  ];
  const bodyData = dataForEdit ?
    [{
      id: dataForEdit.id,
      englishName: dataForEdit.title,
    }] : [];

  return (
    <>
      <CustomModal title={'اصلاح موارد'} isOpen={editService} onDismiss={setEditService} footerData={
        <>
          <div className=' w-full flex  items-center justify-center '>
            <CustomButton label={'ارسال'} onClick={() => {
            }}
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