import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import { Typography, DropSelect, Button } from '@/shared/ui';

const visibility = [
  { value: 'all', label: 'All users' },
  { value: 'friend', label: 'Just friends' },
  { value: 'user', label: 'just me' },
]

const profileStatus = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' }
]

const PrivacySettings = () => {
  return (
    <SubSettingsWrapper title="Privacy Settings">
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
}

export default PrivacySettings