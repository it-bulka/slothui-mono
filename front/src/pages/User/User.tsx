import { Feed, ContactUserToolbar } from '@/widgets';

const User = () => {
  return (
    <Feed withOutAuthor header={<ContactUserToolbar />}/>
  )
}

export default User