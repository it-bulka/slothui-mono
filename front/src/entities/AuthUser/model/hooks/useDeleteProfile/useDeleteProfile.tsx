import { useAppDispatch } from '@/shared/config/redux';
import { deleteProfileThunk } from '../../deleteProfile/deleteProfile.thunk.ts';
import { authUserActions } from '../../slice.ts';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { TokenManager } from '@/shared/libs/services/tokenManager/TokenManager.ts';

export const useDeleteProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProfile = useCallback(async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteProfileThunk()).unwrap();
      new TokenManager().clearToken();
      dispatch(authUserActions.logoutLocal());
      navigate(getLoginPage(), { replace: true });
    } catch {
      setIsDeleting(false);
    }
  }, [dispatch, navigate]);

  return { deleteProfile, isDeleting };
};
