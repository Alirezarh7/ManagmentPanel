import CustomModal from "../general/Modal/CustomModal";
import CustomButton from "../general/Buttons/CustomButton";
import Accordion from "../general/accordion/Accordion";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  editData : number
}

const ConfigControllerModal = ({ onDismiss, isOpen ,editData }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      title={"کنترلر های فرد"}
      onDismiss={onDismiss}
      footerData={
        <>
          <CustomButton label={'ذخیره'} onClick={() => {}} type={'submit'} variant='primary' />
          <CustomButton label={'بستن'} onClick={onDismiss} type={'button'} variant='Cancel' />
        </>
      }
    >
      <>
       <Accordion editData={editData} />
      </>
    </CustomModal>
  );
};

export default ConfigControllerModal;