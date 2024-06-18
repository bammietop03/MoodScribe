export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

export interface SigninValues {
  fullName: string;
  password: string;
}

export interface Route {
  id: number;
  name: string;
  route?: string;
  icon: string;
}
