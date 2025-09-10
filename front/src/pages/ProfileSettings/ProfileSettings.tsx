import { Input, FileInput, Button } from '@/shared/ui';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import MockAvatar from '@/mock/images/avatar.png'

const ProfileSettings = () => {
  return (
    <SubSettingsWrapper title="Profile Settings">
      <form className="flex flex-col gap-4">
        <FileInput title="Upload New Avatar" maxFiles={1} defaultPreview={MockAvatar}/>
        <Input name="name" label="Username" />
        <Input name="about" label="About Me" />
        <Input name="phone" label="Phone number" />
        <Input name="email" label="Email" />
        <Input name="website" label="Website" />

        <div className="flex gap-2 w-full">
          <Button className="grow">Reset</Button>
          <Button className="grow">Save</Button>
        </div>

      </form>
    </SubSettingsWrapper>
  )
}

export default ProfileSettings