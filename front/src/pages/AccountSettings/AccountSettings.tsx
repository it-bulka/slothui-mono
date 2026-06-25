import { memo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { ChangePasswordFormLazy } from '@/features/ChangePassword';
import { Sessions } from '@/features/Sessions';
import { DeleteAccountButton } from '@/features/DeleteAccount';

const AccountSettings = memo(() => {
  const [isChangePassOpen, setChangePassOpen] = useState(false)
  const authUser = useAuthUserSelector()

  if(!authUser) return null

  const isLocalProvider = authUser?.linkedProviders.find(item => item.provider === 'local')
  return (
    <SubSettingsWrapper title="Account Settings">
      <Helmet>
        <title>Account Settings — SlothUI</title>
        <meta name="description" content="Manage your SlothUI account settings." />
      </Helmet>
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
})

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
