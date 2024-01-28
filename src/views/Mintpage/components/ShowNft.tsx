import { Modal } from "antd";
import { ReactNode } from "react";

interface ShowNFTModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: (data: boolean) => void;
}

const ShowNFTModal = ({ isOpen, children, onClose }: ShowNFTModalProps) => {
  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={() => {
        onClose && onClose(false);
      }}
      closable={true}
      footer={null}
      width={600}
    >
      <div>
        <div className="pt-6">{children}</div>
      </div>
    </Modal>
  );
};

export default ShowNFTModal;
