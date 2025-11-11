import { Modal, ModalCard } from '@/shared/ui';
import { CreateGeoFormLazy } from '../CreateGeoForm/CreateGeoForm.async.tsx';

interface GeoModalProps {
  isOpen: boolean
  onClose: () => void
}
export const CreateGeoModal = ({ isOpen, onClose }: GeoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalCard onClose={onClose}>
        {isOpen && <CreateGeoFormLazy />}
      </ModalCard>
    </Modal>
  )
}