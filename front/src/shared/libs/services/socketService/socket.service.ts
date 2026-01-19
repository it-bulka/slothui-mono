import { io, Socket } from 'socket.io-client';
import { ReplaySubject, take } from 'rxjs';
import { TokenManager } from '../tokenManager/TokenManager.ts';

const CONNECTION_TIMEOUT = 1000 * 60; // 1m
export class SocketService {
  private token: string | null = null;
  socket?: Socket;
  private isConnecting: boolean = false;  // if multiple reconnection attempt from other services that use this one
  private static instance: SocketService | null = null;
  public readonly $connected = new ReplaySubject<boolean>(1);
  public readonly $reconnected = new ReplaySubject<boolean>(1);

  constructor(tokenManager: TokenManager) {
    if(SocketService.instance) {
      return SocketService.instance;
    }

    this.token = tokenManager.getToken();

    tokenManager.subscribe(async (token) => {
      this.updateToken(token); // with reconnect
    });

    SocketService.instance = this;
  }


  async connect(): Promise<Socket> {
    if (this.socket && this.socket?.connected) return this.socket;
    if (!this.token) {
      throw new Error('Cannot connect to WebSocket without a token');
    }

    if (this.isConnecting) {
      await this.waitForConnection();
      return this.socket!;
    }
    this.isConnecting = true;

    const ws = io(location.origin, {
      path: '/ws',
      transports: ['websocket'],      // pure WS
      auth: { token: this.token },

      /* ---- reconnection options ---- */
      reconnection: true,
      reconnectionAttempts: Infinity, // Infinity
      reconnectionDelay:  1000,       // start: 1 s
      reconnectionDelayMax: 10000,    // max: 10 s
      randomizationFactor: 0.5,       // jitter 50 %
    });

    this.socket = ws;

    ws.on('reconnected', (err) => {
      console.log('[ws] reconnected', err)
      this.$reconnected.next(true);
    });
    ws.on('reconnect_error', (err) => console.warn('[ws] reconnect error', err));
    ws.on('error',           (err) => console.error('[ws] error', err));

    // wait for connection
    await new Promise<void>((resolve, reject) => {
      ws.once('connect', () => {
        console.log('[ws] connected');
        this.$connected.next(true);
        resolve();
      });

      ws.once('connect_error', (err) => {
        console.error('[ws] connect error', err)
        reject(err);
      });
    });

    this.isConnecting = false;
    return this.socket!;
  }

  private waitForConnection(timeoutMs = CONNECTION_TIMEOUT): Promise<void> {
    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        if (this.socket?.connected) {
          clearTimers()
          resolve();
        }
      }, 50);

      const timer = setTimeout(() => {
        clearTimers();
        console.log('[ws] Socket did not connect in time');
        reject(new Error('Socket did not connect in time'));
      }, timeoutMs);

      function clearTimers(){
        clearInterval(check);
        clearTimeout(timer);
      }
    });
  }

  private updateAuthHandshake() {
    if (this.socket?.connected) {
      this.socket.off()
      this.socket.disconnect();
      this.connect().catch((err) => console.log(err));
    }
  }

  private updateToken(newToken: string | null) {
    this.token = newToken;
    if(!newToken) return;
    this.updateAuthHandshake()
  }

  onConnected(callback: () => void) {
    if (this.socket?.connected) {
      callback();
    } else {
      this.$connected.pipe(take(1)).subscribe(callback);
    }
  }

  callNoConnectionError() {
    throw new Error("No socket connection found.");
  }
}