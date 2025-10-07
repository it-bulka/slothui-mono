import { Socket as IOSocket } from 'socket.io';
import { AuthJwtUser } from '../../auth/types/jwt.types';

export interface SocketWithUser extends IOSocket {
  data: {
    user: AuthJwtUser;
    [key: string]: any;
  };
}
