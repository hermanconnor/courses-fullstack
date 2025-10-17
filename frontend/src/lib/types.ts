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

export interface AuthSuccessResponse {
  message: string;
  status: string;
  data: {
    user: User;
  };
}
