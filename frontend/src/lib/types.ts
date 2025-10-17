export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export interface Credentials {
  emailAddress: string;
  password: string;
}

// export interface AuthResponse {
//   success: boolean;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   errorData?: any;
// }

export interface AuthSuccessResponse {
  message: string;
  status: string;
  data: {
    user: User;
  };
}
