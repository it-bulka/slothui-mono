import { ActionButton } from '@/shared/ui/ActionButton';
import GeoSvg from '@/shared/assets/images/actions/geo.svg?react'
import { CreateGeoModal } from '../CreateGeoModal/CreateGeoModal.tsx';
import { memo, useEffect } from 'react';
import { useGeoDraft } from '@/features/CreateGeolocation/model';

export const CreateGeoButton = memo(() => {
  const { isOpen, open, close } = useGeoDraft()

  useEffect(() => {
    const preload = () => {
      import('../CreateGeoForm/CreateGeoForm')
      import('@/entities/Map/ui/MapView/MapView')
    }
    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    const id = ric(preload)
    return () => window.cancelIdleCallback?.(id)
  }, [])

  return (
    <>
      <ActionButton Icon={GeoSvg} column onClick={open}>Geo</ActionButton>
      <CreateGeoModal isOpen={isOpen} onClose={close} />
    </>
  )
})