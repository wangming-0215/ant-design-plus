import jwtDecode, { JwtPayload } from 'jwt-decode';

import { store } from 'src/utils';
import { LocalStorageKey } from 'src/shared';

class AuthService {
  getAccessToken(): string | null {
    return store.get<string>(LocalStorageKey.accessToken);
  }

  isValidAccessToken(token?: string | null): boolean {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    return (decoded?.exp || 0) > currentTime;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  setSession(accessToken?: string | null): void {
    if (accessToken) {
      store.set(LocalStorageKey.accessToken, accessToken);
    } else {
      store.remove(LocalStorageKey.accessToken);
    }
  }

  authentication() {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return;
    }
    if (this.isValidAccessToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }
}

export default new AuthService();
