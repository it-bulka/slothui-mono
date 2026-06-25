import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import { Typography } from '@/shared/ui/Typography/Typography'
import { DropSelect } from '@/shared/ui/DropSelect/DropSelect'
import { Button } from '@/shared/ui/Button/Button';

const visibility = [
  { value: 'all', label: 'All users' },
  { value: 'friend', label: 'Just friends' },
  { value: 'user', label: 'just me' },
]

const profileStatus = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' }
]

const PrivacySettings = memo(() => {
  return (
    <SubSettingsWrapper title="Privacy Settings">
      <Helmet>
        <title>Privacy Settings — SlothUI</title>
        <meta name="description" content="Control your privacy settings on SlothUI." />
      </Helmet>
      <Typography bold>
        Profile status:
      </Typography>
      <DropSelect options={profileStatus} defaultValue={profileStatus[0]}/>

      <Typography bold>
        Who can comment my posts:
      </Typography>
      <DropSelect options={visibility} defaultValue={visibility[0]}/>

      <Typography bold>
        Who can message to me:
      </Typography>
      <DropSelect options={visibility} defaultValue={visibility[0]}/>

      <Button className="ml-auto" disabled={true}>Save changes</Button>
    </SubSettingsWrapper>
  )
})

PrivacySettings.displayName = 'PrivacySettings'
export default PrivacySettings
