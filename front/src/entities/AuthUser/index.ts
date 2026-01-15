export { authUserReducer } from './model/slice.ts';
export type { IUser } from './types/User.ts';
export type { IAuthResponse } from './types/Auth.ts';
export { loginUser } from './model/login/loginUser.thunk.ts';
export {
  useAuthUserSelector,
  useAuthUserLoadingSelector,
  useAuthUserErrorSelector,
  useAuthUserTokenSelector,
  useAuthUserIdSelector,
  selectAuthUser
} from './model/selectors/userSelector.tsx';