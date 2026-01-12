import { useState } from 'react';
import { Button, Input, Typography, List } from '@/shared/ui';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';

const sessions = [
  "1", "2"
]

const AccountSettings = () => {
  const [isChangePassOpen, setChangePassOpen] = useState(false)
  return (
    <SubSettingsWrapper title="Account Settings">
      <>
        <Input name="phone" label="Phone number" />
        <Input name="email" label="Email" />

        <Button
          className="w-full"
          onClick={()=> setChangePassOpen(prev => !prev)}
        >
          {isChangePassOpen ? "Hide Password Form" : "Change password"}
        </Button>
        {isChangePassOpen && (
          <form className="flex flex-col gap-4">
            <Input name="pass" label="Existed password" />
            <Input name="pass-new" label="New password" />
            <Input name="pass-new-rep" label="Repeat New password" />
            <Button className="ml-auto">Confirm</Button>
          </form>
        )}
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