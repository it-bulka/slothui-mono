import { useState } from 'react';
import { Button, Input, Typography, List } from '@/shared/ui';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import { useAuthUserSelector } from '@/entities';
import { ChangePasswordFormLazy } from '@/features';

const sessions = [
  "1", "2"
]

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
        <Typography bold>Active sessions:</Typography>
        <List topBorder={false}>
          {sessions.map((session) => (
            <List.Item btnText="stop session" key={session}>
              {session}
            </List.Item>
          ))}
        </List>
        <Button className="w-full" variant="secondary">Delete account</Button>
      </>
    </SubSettingsWrapper>
  )
}

export default AccountSettings