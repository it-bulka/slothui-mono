import { Modal, ModalCard } from '@/shared/ui';
import { CreateGeoForm } from '../CreateGeoForm/CreateGeoForm.tsx';

interface GeoModalProps {
  isOpen: boolean
  onClose: () => void
}
export const CreateGeoModal = ({ isOpen, onClose }: GeoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalCard onClose={onClose}>
        <CreateGeoForm />
      </ModalCard>
    </Modal>
  )
}