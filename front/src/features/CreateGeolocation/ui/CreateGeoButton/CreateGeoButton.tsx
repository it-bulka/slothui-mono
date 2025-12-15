import { ActionButton } from '@/shared/ui';
import GeoSvg from '@/shared/assets/images/actions/geo.svg?react'
import { CreateGeoModal } from '../CreateGeoModal/CreateGeoModal.tsx';
import { memo } from 'react';
import { useGeoDraft } from '@/features/CreateGeolocation/model';

export const CreateGeoButton = memo(() => {
  const { isOpen, open, close } = useGeoDraft()

  return (
    <>
      <ActionButton Icon={GeoSvg} column onClick={open}>Geo</ActionButton>
      <CreateGeoModal isOpen={isOpen} onClose={close} />
    </>
  )
})