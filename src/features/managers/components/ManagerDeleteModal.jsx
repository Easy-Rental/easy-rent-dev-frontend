import { MdWarning } from "react-icons/md";
import ConfirmModal from "components/ui/modals/ConfirmModal";

const ManagerDeleteModal = ({ open, manager, onClose, onConfirm, loading }) => {
  if (!manager) return null;

  return (
    <ConfirmModal
      open={open}
      title="Remove Manager"
      message={
        <>
          Are you sure you want to remove{" "}
          <span className="font-semibold text-slate-900">{manager.name}</span>?
          {" "}This action cannot be undone.
        </>
      }
      confirmText="Remove"
      cancelText="Cancel"
      loading={loading}
      icon={<MdWarning size={20} className="text-red-500" />}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ManagerDeleteModal;
