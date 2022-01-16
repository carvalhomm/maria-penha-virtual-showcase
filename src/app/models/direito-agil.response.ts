export interface DirAgilResponse {
  status: 'OK' | 'ERROR';
  code?: DirAgilResponseCode;
  data: any;
}

export type DirAgilResponseCode = 'auth/forbidden' | 'auth/user-not-found' | 'auth/user-not-has-permission' | 'server/error' | 'client/mandatory-field-missing' | 'client/error' | 'config/user-not-has-domain' | 'config/module-not-has-configurations' | 'config/not-has-module-permissions';