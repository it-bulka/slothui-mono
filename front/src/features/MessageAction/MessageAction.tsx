import { useNavigate } from 'react-router';
import { ActionButton } from '@/shared/ui';
import MessageSvg from '@/shared/assets/images/sidebar/message.svg?react'
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig/routeConfig';

export const MessageAction = () => {
  const navigate = useNavigate();

  return <ActionButton variant="secondary" Icon={MessageSvg} onClick={() => navigate(RoutePaths[AppRoutes.CHATS])}/>
}