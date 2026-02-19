import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import { useAuthUserSelector } from '@/entities';
import { ChangePasswordFormLazy, Sessions, DeleteAccountButton } from '@/features';

const AccountSettings = () => {
  const [isChangePassOpen, setChangePassOpen] = useState(false)
  const authUser = useAuthUserSelector()

  if(!authUser) return null

  const isLocalProvider = authUser?.linkedProviders.find(item => item.provider === 'local')
  return (
    <SubSettingsWrapper title="Account Settings">
      <>
        {authUser.email && <Input name="email" label="Email" value={authUser.email} readOnly />}
        {isLocalProvider && (
          <Button
            className="w-full"
            onClick={()=> setChangePassOpen(prev => !prev)}
          >
            {isChangePassOpen ? "Hide Password Form" : "Change password"}
          </Button>
        )}

        {isChangePassOpen && <ChangePasswordFormLazy />}
        <Sessions />
        <DeleteAccountButton />
      </>
    </SubSettingsWrapper>
  )
}

export default AccountSettings