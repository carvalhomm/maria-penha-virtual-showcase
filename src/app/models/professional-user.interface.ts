import { UserRole } from "./UserClaims.interface";

export interface IProfessionalUser extends ProfessionalUser {
  uid: string;
}

export interface ProfessionalUser {
  name: string;
  admin: boolean;
  state: string;
  city: string;
  email: string;
  juizadoResponsavel: string;
  role: UserRole;
}