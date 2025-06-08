import CustomButton from "../components/general/Buttons/CustomButton";
import Input from "../components/general/inputs/Input";
import {Controller, useForm} from "react-hook-form";
import CreateUserModal from "../components/Management/CreateUserModal";
import {useModalStore} from "../store/ZustandStore";


const ManagementMemberPage = () => {
  const {control} = useForm()
  const {modals,open,close} =useModalStore()
  const isOpenCreateUserModal = modals['createUserModal']
  return (
    <div>
      <div className={'grid grid-cols-2 justify-around'}>
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
      <CreateUserModal isOpen={isOpenCreateUserModal} onDismiss={()=>close('createUserModal')} />
    </div>
  );
};

export default ManagementMemberPage;