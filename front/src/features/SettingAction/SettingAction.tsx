import { useNavigate } from 'react-router';
import { ActionButton } from '@/shared/ui';
import SettingSvg from '@/shared/assets/images/sidebar/6.settings.svg?react'
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig/routeConfig';

export const SettingAction = () => {
  const navigate = useNavigate();

  return <ActionButton variant="secondary" Icon={SettingSvg} onClick={() => navigate(RoutePaths[AppRoutes.SETTINGS])}/>
}