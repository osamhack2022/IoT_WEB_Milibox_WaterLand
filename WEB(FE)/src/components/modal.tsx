import { PropsWithChildren } from 'react'
import { Modal as OriginalModal, ModalProps } from 'react-responsive-modal'

interface CustomModalProps extends PropsWithChildren, ModalProps {}

export const Modal = (props: CustomModalProps) => {
  const { open, onClose, children } = props
  return (
    <OriginalModal
      open={open}
      onClose={onClose}
      center
      classNames={{ modal: 'rounded-xl', closeIcon: 'hidden' }}
      styles={{ modal: { padding: 0 } }}
    >
      {children}
    </OriginalModal>
  )
}
