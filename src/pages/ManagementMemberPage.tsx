import CustomButton from "../components/general/Buttons/CustomButton";
import Input from "../components/general/inputs/Input";
import {Controller, useForm} from "react-hook-form";


const ManagementMemberPage = () => {
  const {control} = useForm()
  return (
    <div>
      <div className={'grid grid-cols-2'}>
        <CustomButton variant={'primary'} label={'اضافه کردن'} onClick={() => {
        }} type={'button'}/>
        <Controller control={control} name={'searchBar'} render={({field:{value,onChange}}) =>
          <Input value={value}  onChange={onChange} buttonTitle={'جستجو'} placeholder={'سرج'} disabledButton={false} withButton={true} />
        }/>
      </div>
    </div>
  );
};

export default ManagementMemberPage;