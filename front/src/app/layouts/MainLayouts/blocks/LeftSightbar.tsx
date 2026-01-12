import { UserAuth } from '@/features';
import { ScrollableBlock, Logo, Divider } from '@/shared/ui';
import { NavigationSearchBar, NavBar } from '@/widgets';

export const LeftSidebar = () => {
  return (
    <ScrollableBlock className={"px-4 py-8 flex flex-col border-style-r"}>
      <Logo />
      <NavigationSearchBar />
      <NavBar className="grow" />

      <Divider className={"my-6"}/>
      <UserAuth />
    </ScrollableBlock>
  )
}