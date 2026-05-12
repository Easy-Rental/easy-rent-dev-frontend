import { MdWarning } from "react-icons/md";
import ConfirmModal from "components/ui/modals/ConfirmModal";

const ModelDeleteModal = ({ open, model, onClose, onConfirm, loading }) => {
  if (!model) return null;

  return (
    <ConfirmModal
      open={open}
      title="Delete Model"
      message={
        <>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900">{model.brand_name} {model.name}</span>?
          {" "}This action cannot be undone.
        </>
      }
      confirmText="Delete"
      cancelText="Cancel"
      loading={loading}
      icon={<MdWarning size={20} className="text-red-500" />}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ModelDeleteModal;
