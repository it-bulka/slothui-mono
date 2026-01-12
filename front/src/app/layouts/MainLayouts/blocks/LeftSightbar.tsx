import { NavBar } from '@/widgets/NavBar/NavBar.tsx';
import { SearchBar, Logo } from '@/shared/ui';
import { UserAuth } from '@/features';
import { Divider } from '@/shared/ui/Divider/Divider.tsx';
import { ScrollableBlock } from '@/shared/ui';

export const LeftSidebar = () => {
  return (
    <ScrollableBlock className={"px-4 py-8 flex flex-col border-style-r"}>
      <Logo />
      <SearchBar className="my-8" placeholder={"Navigation over site..."}/>
      <NavBar className="grow" />

      <Divider className={"my-6"}/>
      <UserAuth />
    </ScrollableBlock>
  )
}