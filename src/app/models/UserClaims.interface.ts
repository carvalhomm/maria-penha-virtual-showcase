export interface UserClaims {
  domain: string;
  admin: boolean;
  city: string;
  state: string;
  juizadoResponsavel: string;
  role: UserRole;
}

export type UserRole = 'juiz' | 'analista' | 'ti' | 'direitoAgil';
