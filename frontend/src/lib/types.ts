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

export interface Course {
  id: number;
  title: string;
  description: string;
  estimatedTime?: string;
  materialsNeeded?: string;
  userId: number;
}

export interface CourseDetails {
  id: number;
  title: string;
  description: string;
  estimatedTime?: string;
  materialsNeeded?: string;
  userId: number;
  user: User;
}
