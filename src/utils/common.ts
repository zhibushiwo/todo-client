import { Modal, ModalFuncProps } from 'antd';

export const confirmFuc = (props: ModalFuncProps) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      ...props,
      onCancel() {
        reject();
      },
      onOk() {
        resolve(null);
      },
    });
  });
};
