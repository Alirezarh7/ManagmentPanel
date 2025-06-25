import CustomButton from "../components/general/Buttons/CustomButton";
import Input from "../components/general/inputs/Input";
import {Controller, useForm} from "react-hook-form";
import CreateUserModal from "../components/Management/CreateUserModal";
import {useDataToSet, useModalStore} from "../store/ZustandStore";
import {useAdvancedSearchUsers} from "../services/user.service";
import DataGrid from "../components/general/gridShow/DataGrid";
import {useNavigate} from "react-router";
import {useState} from "react";


const ManagementMemberPage = () => {
  const {control,watch} = useForm()
  const [currentPage, setCurrentPage] = useState<number>();
  const pageSize = 5
  const {data:AdvancedSearchData,refetch} = useAdvancedSearchUsers(currentPage ?? 1 ,pageSize,watch('searchBar'))
  const totalItems =  0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate()
  const {modals,open,close} =useModalStore()
  const isOpenCreateUserModal = modals['createUserModal']

  const {data:editData,setData:setEditData} = useDataToSet()
  console.log(editData)
  const onEdit = async (row: any) => {
    return await setEditData(row.id).then(()=>{
      open('createUserModal')
    })
  };
  const headData = [
    {title: "نام", key: "name"},
    {title: "کد ملی", key: "nationalCode"},
    {title: "شهر", key: "provinceName"},
    {title: "کارگزاری حج", key: "kargozarNoHaj"},
    {title: "کارگزاری عمره", key: "kargozarNoUmrah"},

  ];
  const bodyData = AdvancedSearchData?.map((destructure) => ({
    name: destructure.name + ' ' + destructure.family,
    nationalCode: destructure.nationalCode,
    provinceName:destructure.provinceName,
    kargozarNoHaj:destructure.kargozarNoHaj,
    kargozarNoUmrah:destructure.kargozarNoUmrah,
    id: destructure.id,
    hasActions : true
  })) ?? [];


  const onContinue = (row: any) => {
    navigate(`/management-member/${row.id}`,{state:{
      data:row
      }})
  }
  return (
    <div>
      <div className={'grid grid-cols-2 justify-around my-5'}>
        <div className={' mt-3'}>
        <CustomButton variant={'primary'} label={'اضافه کردن'} onClick={()=>open('createUserModal')} type={'button'}/>
        </div>
        <div className={' max-w-48 mt-3'}>
          <Controller control={control} name={'searchBar'} render={({field: {value, onChange}}) =>
            <Input value={value} onChange={onChange} buttonTitle={'جستجو'} placeholder={'سرج'} disabledButton={false}
                   withButton={true}
                   onClick={()=>{
                     if(watch('searchBar')){
                       refetch()
                     }
                   }}
            />
          }/>
        </div>
      </div>
      {AdvancedSearchData  ? <DataGrid
        currentPage={currentPage ?? 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        bodyData={bodyData} headData={headData} onEdit={onEdit} activities={true} onContinue={onContinue}  /> : null }
      <CreateUserModal editData ={editData ?? 0} isOpen={isOpenCreateUserModal} onDismiss={()=>close('createUserModal')} />
    </div>
  );
};

export default ManagementMemberPage;