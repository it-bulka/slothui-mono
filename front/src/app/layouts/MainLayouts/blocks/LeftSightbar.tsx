import { NavBar } from '@/widgets/NavBar/NavBar.tsx';
import { SearchBar, Logo } from '@/shared/ui';
import { UserAuth } from '@/features';
import { Divider } from '@/shared/ui/Divider/Divider.tsx';

export const LeftSidebar = () => {
  return (
    <div className={"px-4 py-8 flex flex-col h-full border-style-r"}>
      <Logo />
      <SearchBar className="my-8" placeholder={"Search..."}/>
      <NavBar className="grow" />

      <Divider className={"my-6"}/>
      <UserAuth />
    </div>
  )
}