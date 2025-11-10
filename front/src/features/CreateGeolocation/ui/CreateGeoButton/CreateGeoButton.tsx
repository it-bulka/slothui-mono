import { ActionButton } from '@/shared/ui';
import GeoSvg from '@/shared/assets/images/actions/geo.svg?react'
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { CreateGeoModal } from '../CreateGeoModal/CreateGeoModal.tsx';
import { memo } from 'react';

export const CreateGeoButton = memo(() => {
  const { isOpen, open, close } = useModalControl()
  return (
    <>
      <ActionButton Icon={GeoSvg} column onClick={open}>Geo</ActionButton>
      <CreateGeoModal isOpen={isOpen} onClose={close} />
    </>
  )
})