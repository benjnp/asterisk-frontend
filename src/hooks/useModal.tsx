import { Modal, ModalProps } from 'antd';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = (component: ReactNode, modalProps?: ModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAfterClose = () => {
    setLoading(false);
  };

  return {
    setModalLoading: setLoading,
    setModalOpen: setOpen,
    modal: typeof document !== 'undefined' ? createPortal(
      <Modal
        title={null}
        open={open}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
        afterClose={handleAfterClose}
        footer={null}
        centered={true}
        {...modalProps}
      >
        {component}
      </Modal>,
      document.body
    ) : null,
  };
};

export default useModal;
