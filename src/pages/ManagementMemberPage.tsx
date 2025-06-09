import CustomButton from "../components/general/Buttons/CustomButton";
import Input from "../components/general/inputs/Input";
import {Controller, useForm} from "react-hook-form";
import CreateUserModal from "../components/Management/CreateUserModal";
import {useDataToSet, useModalStore} from "../store/ZustandStore";
import {useAdvancedSearchUsers} from "../services/user.service";
import DataGrid from "../components/general/gridShow/DataGrid";


const ManagementMemberPage = () => {
  const {data:AdvancedSearchData} = useAdvancedSearchUsers()

  const {control} = useForm()
  const {modals,open,close} =useModalStore()
  const isOpenCreateUserModal = modals['createUserModal']
  const {data:editData,setData:setEditData} = useDataToSet()

  const headData = [
    {title: "نام", key: "name"},
    {title: "کد ملی", key: "nationalCode"},

  ];
  const bodyData = AdvancedSearchData?.map((destructure) => ({
    name: destructure.name + ' ' + destructure.family,
    nationalCode: destructure.nationalCode,
    id: destructure.id,
    hasActions : true
  })) ?? [];

  const onEdit = (row: any) => {
    setEditData(row.id).then(()=>{
      console.log(editData)
    })
  }

  const onContinue = (row: any) => {}
  return (
    <div>
      <div className={'grid grid-cols-2 justify-around my-5'}>
        <div className={' mt-3'}>
        <CustomButton variant={'primary'} label={'اضافه کردن'} onClick={()=>open('createUserModal')} type={'button'}/>
        </div>
        <div className={' max-w-48 mt-3'}>
          <Controller control={control} name={'searchBar'} render={({field: {value, onChange}}) =>
            <Input value={value} onChange={onChange} buttonTitle={'جستجو'} placeholder={'سرج'} disabledButton={false}
                   withButton={true}/>
          }/>
        </div>
      </div>
      {AdvancedSearchData  ? <DataGrid bodyData={bodyData} headData={headData} onEdit={onEdit} activities={true} onContinue={onContinue}  /> : null }
      <CreateUserModal isOpen={isOpenCreateUserModal} onDismiss={()=>close('createUserModal')} />
    </div>
  );
};

export default ManagementMemberPage;